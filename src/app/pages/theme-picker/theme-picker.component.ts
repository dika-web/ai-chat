import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconButton} from '@angular/material/button';
import {THEMES} from './constants';

@Component({
  selector: 'smart-theme-picker',
  standalone: true,
  imports: [MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatIconButton],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent {
  themes = THEMES;
  public selectTheme() {
    //in progress
  }
}
