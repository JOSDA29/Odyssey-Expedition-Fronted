import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
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
  @Input() style: 'input-text' | 'inputUpdateHotelDescrip' | 'inputUpdateHotel' | 'inputAdmin' | 'input-text-naviera' | 'input-text2' | 'input-desible' | 'inputIA' | 'input-number' | 'input-number2' | 'input-update' | 'input-register' = 'input-text';

  @Output() enterPressed = new EventEmitter<void>();

  // ControlValueAccessor methods
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
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

  // Handle Enter key press
  onEnter(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      event.preventDefault();
      this.enterPressed.emit();
    }
  }
}
