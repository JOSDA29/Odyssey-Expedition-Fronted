import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {
  @Input() description: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() style: 'container' | 'containerProveedor' | 'containerPaquete' = 'container';

  @Output() descriptionChange = new EventEmitter<string>();

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.description = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  onDescriptionChange(newDescription: string): void {
    this.description = newDescription;
    this.onChange(this.description);
    this.descriptionChange.emit(this.description);
  }
}
