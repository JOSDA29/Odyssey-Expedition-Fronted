import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'] // Asegúrate de que sea 'styleUrls'
})
export class InputDateComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() txt: string = '';
  @Input() style: 'input-text-wrapper' | 'input-text-wrapper2' = 'input-text-wrapper'
  @Input() submitted: boolean = false;
   @Input() disabled: boolean = false;
  @Input() control: FormControl = new FormControl();

  openCalendar(calendarInput: HTMLInputElement) {
    calendarInput.focus();
  }

  updateText(event: any) {
    const value = event.target.value;
    this.txt = value ?? '';
    this.control.setValue(value); // Asegúrate de sincronizar el valor del control con el campo de entrada
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
