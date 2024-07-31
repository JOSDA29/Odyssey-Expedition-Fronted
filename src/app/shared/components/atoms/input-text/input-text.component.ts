import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() style: 'input-text' | 'input-desible' | 'input-number' | 'input-update' | 'input-register' = 'input-text';

  newText: string = '';

  // ControlValueAccessor methods
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.newText = value;
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  // Sync the control value and newText
  onInput(value: string): void {
    this.newText = value;
    this.control.setValue(value);
    this.onChange(value);
  }
}
