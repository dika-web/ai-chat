import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MarkdownComponent} from 'ngx-markdown';
import {delay, from, scan, take, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ai-typing-markdown',
  standalone: true,
  imports: [MatIcon, MarkdownComponent],
  templateUrl: './typing-markdown.component.html',
  styleUrl: './typing-markdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingMarkdownComponent implements OnChanges {
  prompt = input('');
  startDelay = input(1000);
  content = signal('');
  private readonly _destroyRef = inject(DestroyRef);

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['prompt'].currentValue) {
      this.startTyping();
    }
  }

  public startTyping() {
    from(this.prompt().split(''))
      .pipe(
        delay(this.startDelay()),
        scan((cur, prev) => cur + prev, ''),
        tap((char) => this.content.set(char)),
        take(this.prompt().length),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
