import { Form, type IconType, Input, SEARCH_ICON, withZod } from '@/shared';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { type SearchPayload, SearchSchema } from '../../model';

@Component({
  selector: 'app-search-chats',
  imports: [Form, Input],
  templateUrl: './search-chats.html',
  styleUrl: './search-chats.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SearchChats {
  protected readonly model = signal<SearchPayload>({ search: "" });
  protected readonly form = form(this.model, withZod(SearchSchema));
  protected readonly searchIcon: IconType = SEARCH_ICON;

  public search({ search }: SearchPayload): void {
    console.log(`Search: ${search}`);

  }
}
