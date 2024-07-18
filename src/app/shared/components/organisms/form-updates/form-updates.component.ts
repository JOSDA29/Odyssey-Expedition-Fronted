import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-form-updates',
  templateUrl: './form-updates.component.html',
  styleUrls: ['./form-updates.component.scss']
})
export class FormUpdatesComponent {
  @Input() title: string = '';
  @Input() info: string = '';
  @Input() text: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  newText1: string = '';
  newText2: string = '';
  errorMessage: string = '';


  constructor() {
    this.newText1 = this.text;
  }


  onSave() {
    if (this.newText1 === '' || this.newText2 === '') {
      this.errorMessage = 'Los campos no pueden estar vacíos.';
    }else if (this.newText1.length < 5  || this.newText2.length < 5) {
      this.errorMessage = 'El contenido debe tener al menos 5 caracteres';
    } 
    else if (this.newText1 !== this.newText2) {
      this.errorMessage = 'Los valores no coinciden.';
    } else {
      this.save.emit(this.newText1);
      this.errorMessage = '';
    }
  }
  

  onCancel() {
    console.log('Cancelled');
    this.cancel.emit();
  }

}
