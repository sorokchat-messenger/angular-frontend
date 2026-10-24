import { Component, inject } from '@angular/core';
import { Modal, Button } from '@/shared';
import { ModalRef } from '@/shared/utils/modal-ref';
import { injectLogout } from '../../api';

@Component({
  selector: 'app-logout-configm',
  imports: [Modal, Button],
  templateUrl: './logout-confirm.html',
  styleUrl: './logout-confirm.scss',
})
export class LogoutConfirm {
  private readonly ref = inject(ModalRef);
  private readonly mutation = injectLogout();

  protected logout(): void {
    this.mutation.mutate();
    this.close();
  }

  protected close(): void {
    this.ref.close();
  }
}
