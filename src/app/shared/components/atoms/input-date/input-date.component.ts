import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss'
})
export class InputDateComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() txt: string = '';

  openCalendar(calendarInput: HTMLInputElement) {
    calendarInput.focus();
  }

  updateText(event: any) {
    const value = event.target.value;
    // Actualiza el texto con la fecha seleccionada
    this.txt = value ?? '';
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const day = today.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }
}
