import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { type RegisterPayload } from '@sorokchat-messenger/contracts';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Path } from '@/shared';

@Component({
  selector: 'app-register-form',
  imports: [FormField, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterForm {
  private readonly model = signal<Required<RegisterPayload>>({ login: "", password: "", displayName: '' });
  protected readonly form = form(this.model);
  protected readonly loginPath: string = Path.LOGIN_PAGE.fullPath;

  public register(event: SubmitEvent): void {
    event.preventDefault();
    const data: Record<string, unknown> = this.form().value();
    const payload: Record<string, unknown> = {};
    Object.keys(data).forEach(key => {
      if (typeof data[key] !== 'string' || data[key].trim() !== '') {
        payload[key] = data[key];
      }
    })
  }
}
