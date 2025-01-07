import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  DestroyRef, ElementRef,
  inject,
  signal, ViewChild,
} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import { map, tap} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ChatInterface} from '../../core/models';
import {PromptService} from '../../core/services/prompts';
import {MarkdownComponent, MARKED_OPTIONS, provideMarkdown} from "ngx-markdown";
import {markedOptionsFactory} from '../../shared/utils';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'smart-chat',
  standalone: true,
  imports: [MatFormFieldModule, MatInput, ReactiveFormsModule, MatIcon, MatButton, MarkdownComponent, CommonModule],
  providers: [provideMarkdown({
    markedOptions: {
      provide: MARKED_OPTIONS,
      useFactory: markedOptionsFactory
    }
  })],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') scrollFrame!: ElementRef;
  readonly _gptService = inject(PromptService);
  readonly promptMessage = new FormControl('', [Validators.required]);
  private readonly _destroyRef = inject(DestroyRef);
  messages = signal<Omit<ChatInterface, 'userId'>[]>([]);
  private isAutoScrollAllowed = true;

  constructor() {
    this._gptService
      .getPrompts()
      .pipe(
        map((prompt) => prompt.map((data) => ({id: data.id, prompt: data.prompt, response: data.response}))),
        tap((data) => this.messages.set(data)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngAfterViewChecked() {
    if (this.isAutoScrollAllowed) {
      this.scrollToBottom()
    }
  }

  scrollToBottom() {
    const formContainer = this.scrollFrame.nativeElement
    formContainer.scrollTo({top: formContainer.scrollHeight - 100, behavior: 'smooth'});
  }

  onUserScroll(event: Event): void {
    this.isAutoScrollAllowed = false
  }

  public onEnter(event: Event): void {
    event.preventDefault();
    if (!this.promptMessage.value?.trim()) {
      return;
    }
    this.sendRequest(event);
    this.promptMessage.setValue('');
  }

  sendRequest(event: Event) {
    const messageId = uuidv4();
    const prompt = this.promptMessage.value?.trim() || '';
    event.preventDefault();

    if (!this.promptMessage.value) {
      return;
    }

    this.messages.update((data) => [...data, {id: messageId, prompt, response: ''}]);
    const index = this.messages().findIndex((item) => item.id === messageId);
    this._gptService
      .createStream({id: messageId, userId: '676da2fa10c33b536db38397', prompt: this.promptMessage.value, projectId: ''})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data=> {
        this.isAutoScrollAllowed = true
        this.messages.update((currentMessage) => {
          const updatedMessages = [...currentMessage];
          updatedMessages[index] = {
            ...updatedMessages[index],
            response: updatedMessages[index].response + data,
          };
          return updatedMessages;
        });
      });

    this.promptMessage.setValue('');
  }

}
