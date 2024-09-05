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
  newText: string = ''  ;
  errorMessage: string = '';



  ngOnInit() {
    this.newText = this.text;
  }
  
  onSave() {
    if (this.newText === '') {
      this.errorMessage = 'El campo no puede estar vacío.';
    } else if (this.newText.length < 5) {
      this.errorMessage = 'El contenido debe tener al menos 5 caracteres';
    } else if (this.newText.length > 100) {
      this.errorMessage = 'El contenido excede el limite de 100 caracteres';
    } else {
      this.save.emit(this.newText);  // Emitimos el nuevo texto al componente superior
      this.errorMessage = '';
    }
  }
  

  onCancel() {
    console.log('Cancelled');
    this.cancel.emit();
  }
}
