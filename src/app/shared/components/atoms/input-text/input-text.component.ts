import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor, Validator {
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() style: 'input-text' | 'input-number' | 'input-register' = 'input-text';

  private innerValue: any = '';

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    this.innerValue = val;
    this.onChange(val);
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Opcional: lógica para manejar el estado deshabilitado
  }

  validate(control: FormControl) {
    return null; // Puedes añadir lógica de validación aquí si es necesario
  }
}
