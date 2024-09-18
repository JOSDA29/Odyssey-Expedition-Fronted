import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

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
  @Input() disableMinDate: boolean = false;  // Nueva propiedad de entrada para deshabilitar la fecha mínima
  @Input() submitted: boolean = false;
  @Input() disabled: boolean = false;
  @Input() control: FormControl = new FormControl(); // Control reactivo del formulario

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Detección de cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges) {
    if (changes['txt'] && !changes['txt'].firstChange) {
      this.control.setValue(this.txt, { emitEvent: false }); // Actualiza el control sin emitir eventos adicionales
    }
  }

  ngOnInit() {
    // Escuchar cambios en el FormControl para formatear la fecha seleccionada
    this.control.valueChanges.subscribe((value) => {
      if (value) {
        const formattedValue = this.formatDate(new Date(value));
        this.txt = formattedValue;
        this.onChange(formattedValue); // Emite el valor formateado
      }
    });
  }

  // Método para abrir el calendario del DatePicker
  openCalendar(picker: MatDatepicker<Date>) {
    if (!this.disabled) {
      picker.open();
    }
  }

  writeValue(value: any): void {
    if (value) {
      // Verifica si el valor es una instancia de Date o ya es un string formateado
      if (value instanceof Date) {
        this.txt = this.formatDate(value);
      } else if (this.isValidDate(value)) {
        this.txt = value; // Si ya es una fecha válida, usa directamente el valor
      }
      this.control.setValue(this.txt, { emitEvent: false }); // Establece el valor formateado en el control sin emitir eventos adicionales
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

  // Maneja el cambio de fecha desde el DatePicker
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const value = event.value;
    if (value) {
      this.txt = this.formatDate(value);
      this.control.setValue(this.txt);
      this.onChange(this.txt);
    }
  }

  // Retorna la fecha actual en formato yyyy-MM-dd
  getCurrentDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  // Verifica si el campo de fecha está vacío
  isEmpty(): boolean {
    return !this.control.value;
  }

  // Valida si el string es una fecha válida en formato yyyy-MM-dd
  isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  }

  formatDate(date: Date): string {
    // Verifica si hay una diferencia horaria y ajústala manualmente
    const adjustedDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
    return formatDate(adjustedDate, 'yyyy-MM-dd', 'en-US');
  }
  
}
