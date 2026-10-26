import { Component, computed, input } from '@angular/core';
import { injectDeleteChat } from '../../api';
import { DELETE_ICON, IconButton, type IconType } from '@/shared';

@Component({
  selector: 'app-delete-chat',
  imports: [IconButton],
  templateUrl: './delete-chat.html',
  styleUrl: './delete-chat.scss',
})
export class DeleteChat {
  public readonly id = input.required<string>();

  protected readonly mutation = injectDeleteChat(this.id);

  protected readonly icon: IconType = DELETE_ICON;

  protected delete() {
    this.mutation.mutate();
  }
}
