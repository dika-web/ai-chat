import {Component, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'smart-clipboard-button',
  standalone: true,
  imports: [MatButton, MatIcon],
  templateUrl: './clipboard-button.component.html',
  styleUrl: './clipboard-button.component.scss'
})
export class ClipboardButtonComponent {
  isCopied = signal(false);

  public onClick(event: Event) {
    event.preventDefault();
    this.isCopied.set(true);
  }
}
