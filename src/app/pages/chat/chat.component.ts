import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {PromptService} from '../../core/services/gpt-service';
import {TypingMarkdownComponent} from '../typing-markdown';
import {map, tap} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ChatInterface} from '../../core/models';

@Component({
  selector: 'ai-chat',
  standalone: true,
  imports: [MatFormFieldModule, MatInput, ReactiveFormsModule, MatIcon, MatButton, TypingMarkdownComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  readonly _gptService = inject(PromptService);
  readonly promptMessage = new FormControl('', [Validators.required])
  private readonly _destroyRef = inject(DestroyRef);
  messages = signal<Omit<ChatInterface, 'userId'>[]>([]);
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

  public onEnter(event: Event): void {
    event.preventDefault();
    this.sendRequest(event);
  }

  sendRequest(event: Event) {
    const messageId = uuidv4();
    const prompt = this.promptMessage.value || '';
    event.preventDefault();

    if (!this.promptMessage.value) {
      return;
    }

    this.messages.update((data) => [...data, {id: messageId, prompt, response: ''}]);

    this._gptService
      .createPrompt({id: messageId, userId: '676da2fa10c33b536db38397', prompt: this.promptMessage.value}).pipe(
        takeUntilDestroyed(this._destroyRef)
    )
      .subscribe((res) => {
        this.messages.update((data) => {
          const index = data.findIndex((item) => item.id === res.id);
          if (index !== -1) {
            data[index] = {...data[index], response: res.response};
          }
          return data;
        });
      });

    this.promptMessage.setValue('');
  }
}
