import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-conten-multifaceted',
  templateUrl: './conten-multifaceted.component.html',
  styleUrls: ['./conten-multifaceted.component.scss']
})
export class ContenMultifacetedComponent implements OnInit {
  @Input() min: number = 2;
  @Input() max: number = 6;
  @Input() textbutton: string = '';
  @Input() contensSection: { 
    title: string,
    section?: string | null,
    origin: string,
    destination: string,
    dates: string,
    ida?: string | null,
    vuelta?: string | null,
    peopple?: string | null,
  }[] = [];

  @Input() checkboxes: { 
    label: string, 
    isChecked: boolean 
  }[] = [];

  @Input() checkMenu: number = 0;
  form!: FormGroup;
  submitted = false;

  // Nueva propiedad para almacenar los tramos
  tramos: Array<{ 
    origin: FormControl, 
    destination: FormControl, 
    ida: FormControl 
  }> = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      ida: ['', Validators.required],
      vuelta: ['', Validators.required],
      peopple: ['', Validators.required],
    });

    // Inicializa con un tramo por defecto
    this.addTramo();
    this.addTramo();
  }

  get originControl(): FormControl {
    return this.form.get('origin') as FormControl;
  }

  get destinationControl(): FormControl {
    return this.form.get('destination') as FormControl;
  }

  get peoppleControl(): FormControl {
    return this.form.get('peopple') as FormControl;
  }
  
  get idaControl(): FormControl {
    return this.form.get('ida') as FormControl;
  }
  
  get vueltaControl(): FormControl {
    return this.form.get('vuelta') as FormControl;
  }

  validateForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();  // Marca todos los controles como tocados para mostrar los mensajes de error
      return;
    }
    // Lógica adicional para el botón
  }

  onSubmit() {
    this.submitted = true;
    this.validateForm();
    if (this.form.valid) {
      // Realizar la acción del botón
    }
  }

  onCheckboxChange(selectedIndex: number) {
    this.checkboxes = this.checkboxes.map((checkbox, index) => ({
      ...checkbox,
      isChecked: index === selectedIndex
    }));
    this.checkMenu = selectedIndex;
    console.log('seccion',this.checkMenu);
  }

  // Método para agregar un nuevo tramo
  addTramo() {
    if (this.tramos.length < this.max) {
      const newTramo = {
        origin: new FormControl('', Validators.required),
        destination: new FormControl('', Validators.required),
        ida: new FormControl('', Validators.required)
      };
      this.tramos.push(newTramo);
    }
  }

  removeTramo(index: number) {
    if (this.tramos.length > this.min) { // Solo permite eliminar si hay más tramos que el mínimo permitido
      this.tramos.splice(index, 1);
    }
  }

}
