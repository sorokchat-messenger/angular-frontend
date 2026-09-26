import { HIDE_PASSWORD_ICON, SHOW_PASSWORD_ICON } from '@/shared/constants';
import { type IconType, type InputType } from '../../types';
import { ChangeDetectionStrategy, Component, computed, input, signal, Signal } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { type FieldState } from '@angular/forms/signals';
import { IconButton } from '../icon-button';
import { Icon } from '../icon';

@Component({
  selector: 'app-input',
  imports: [FormField, IconButton, Icon],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Input {
  private readonly passwordType = signal<InputType>('password');

  public readonly placeholder = input.required<string>();
  public readonly type = input<InputType>('text');
  public readonly field = input.required<FieldState<unknown, string | number>>();
  public readonly hasErrors = input<boolean>(false);
  public readonly icon = input<IconType>();
  public readonly inputIcon = computed<IconType>(() => this.passwordType() === 'password' ? SHOW_PASSWORD_ICON : HIDE_PASSWORD_ICON);

  public get formField(): Signal<Field<any, string | number>> {
    return computed(() => this.field as unknown as Field<any, string | number>);
  }

  public get name(): Signal<string> {
    return computed(() => this.field().name());
  }

  protected get inputType(): Signal<InputType> {
    return computed<InputType>(() => {
      const type = this.type();
      const passwordType = this.passwordType();
      if (type === 'password') return passwordType;
      else return type;
    });
  }

  protected switchType(): void {
    this.passwordType.update(type => type === 'password' ? 'text' : 'password');
  }
}
