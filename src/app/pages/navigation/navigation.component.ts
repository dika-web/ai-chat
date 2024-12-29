import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {NgClass} from '@angular/common';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {MatTooltip} from '@angular/material/tooltip';
import {SidenavComponent} from '../sidenav/sidenav.component';

@Component({
  selector: 'ai-navigation',
  standalone: true,
  imports: [MatToolbar, MatIcon, MatSlideToggle, NgClass, UserProfileComponent, MatTooltip, SidenavComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  isDarkMode = input(false);
  darkModeSwitched = output<boolean>();
}
