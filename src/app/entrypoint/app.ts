import { injectIsAuthenticated } from '@/entities';
import { PageLoader } from '@/shared';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly isAuthenticated = injectIsAuthenticated();

  protected readonly isLoading = computed(() => this.isAuthenticated());
}
