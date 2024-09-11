import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor, OnChanges {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() txt: string = ''; // El texto que deseas mostrar
  @Input() style: string = 'input-text-wrapper';
  @Input() submitted: boolean = false;
  @Input() disabled: boolean = false;
  @Input() control: FormControl = new FormControl();
  
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['txt']) {
      this.control.setValue(this.txt); // Actualiza el control con el valor de txt
    }
  }
  
  writeValue(value: any): void {
    if (value !== undefined) {
      this.txt = value;
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  openCalendar(calendarInput: HTMLInputElement): void {
    calendarInput.focus();
  }

  updateText(event: any): void {
    const value = event.target.value;
    this.txt = value;
    this.control.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const day = today.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }

  isEmpty(): boolean {
    return !this.control.value;
  }
}
