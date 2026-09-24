import { LoginForm } from '@/features';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LoginPage { }
