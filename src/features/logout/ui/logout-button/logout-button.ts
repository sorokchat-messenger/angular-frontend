import { DangerButton } from '@/shared';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectLogout } from '../../api';

@Component({
  selector: 'app-logout-button',
  imports: [DangerButton],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LogoutButton {
  private readonly mutation = injectLogout();

  public logout(): void {
    this.mutation.mutate();
  }
}
