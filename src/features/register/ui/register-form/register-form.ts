import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RegisterSchema, type RegisterPayload } from '@sorokchat-messenger/contracts';
import { form } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Button, Field, Form, Path, withZod } from '@/shared';
import { injectRegister } from '../../api';

@Component({
  selector: 'app-register-form',
  imports: [RouterLink, Form, Button, Field],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterForm {
  private readonly model = signal<Required<RegisterPayload>>({ login: "", password: "", displayName: '' });
  private readonly mutation = injectRegister();

  protected readonly form = form(this.model, withZod(RegisterSchema));
  protected readonly loginPath: string = Path.LOGIN_PAGE.fullPath;

  public register(payload: RegisterPayload): void {
    this.mutation.mutate(payload);
  }
}
