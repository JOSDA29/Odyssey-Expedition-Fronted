import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrl: './search-hotel.component.scss'
})
export class SearchHotelComponent implements OnInit {
  @Input() textbutton: string = '';
  @Input() contenHotel: { 
    section?: string | null,
    destination: string,
    dates: string,
    ida?: string | null,
    vuelta?: string | null,
    rooms: string,
    peopple?: string | null,
  }[] = [];

 

  form!: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      ida: ['', Validators.required],
      vuelta: ['', Validators.required],
      peopple: ['', Validators.required],
    });

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
  }

  onSubmit() {
    this.submitted = true;
    this.validateForm();
    if (this.form.valid) {
      // Realizar la acción del botón
    }
  }

}
