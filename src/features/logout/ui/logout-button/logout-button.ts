import { Button, ModalService } from '@/shared';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectLogout } from '../../api';
import { LogoutConfirm } from '../logout-confirm';

@Component({
  selector: 'app-logout-button',
  imports: [Button],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LogoutButton {
  private readonly mutation = injectLogout();
  private readonly modalService = inject(ModalService);

  public logout(): void {
    this.modalService.open(LogoutConfirm);
  }
}
