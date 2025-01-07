import {
  Component,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import {NavigationComponent} from './pages/navigation/navigation.component';
import {LocalStorageService} from './shared/services/storage';
import {ACTIVE_THEME_KEY} from './shared/constants/constants';
import {DOCUMENT} from '@angular/common';
import {ChatComponent} from './pages/chat/chat.component';
import {ReactiveFormsModule} from "@angular/forms";
import './shared/prism-lang'

enum Themes {
  LightMode = 'theme-light',
  DarkMode = 'theme-dark'
}

@Component({
  selector: 'smart-root',
  standalone: true,
  imports: [NavigationComponent, ChatComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private readonly localStorageService = inject(LocalStorageService);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private currentTheme = Themes.LightMode;

  get isDarkMode(): boolean {
    return this.currentTheme === Themes.DarkMode;
  }


  ngOnInit() {
    this.currentTheme = this.localStorageService.get(ACTIVE_THEME_KEY) || Themes.LightMode;
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  public receiveThemeMode(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? Themes.DarkMode : Themes.LightMode;
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    this.localStorageService.set(ACTIVE_THEME_KEY, this.currentTheme);
  }
}
