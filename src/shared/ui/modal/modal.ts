import { CLOSE_ICON, IconButton, type IconType } from '@/shared';
import { ModalRef } from '@/shared/utils/modal-ref';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [IconButton],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  protected readonly closeIcon: IconType = CLOSE_ICON;
  private readonly ref = inject(ModalRef);

  public readonly heading = input.required<string>();

  protected close() {
    this.ref.close();
  }
}
