import { injectIsAuthenticated } from '@/entities';
import { PageLoader } from '@/shared';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLoader, NgxSonnerToaster],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly isAuthenticated = injectIsAuthenticated();

  protected readonly isLoading = computed(() => this.isAuthenticated() === undefined);
}
