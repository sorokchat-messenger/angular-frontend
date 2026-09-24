import { Button, Field, Form, Path, withZod } from '@/shared';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { LoginSchema, type LoginPayload } from '@sorokchat-messenger/contracts';

@Component({
  selector: 'app-login-form',
  imports: [Form, Field, Button, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LoginForm {
  private readonly model = signal<Required<LoginPayload>>({ login: "", password: "" });
  public readonly form = form(this.model, withZod(LoginSchema));
  public readonly registerPath: string = Path.REGISTER_PAGE.fullPath;

  public login(payload: LoginPayload): void {
    console.log(payload);
  }
}
