import { LogoutButton } from '@/features';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  imports: [LogoutButton],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SettingsPage { }
