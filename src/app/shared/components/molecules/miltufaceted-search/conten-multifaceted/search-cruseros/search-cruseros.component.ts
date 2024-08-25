import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-cruseros',
  templateUrl: './search-cruseros.component.html',
  styleUrl: './search-cruseros.component.scss'
})
export class SearchCruserosComponent implements OnInit{
  
  @Input()   contenCruseros: { 
    section?: string | null,
    destination: string,
    exit: string,
    duration: string,
    port: string,
    boat: string,
    naviera: string,
  }[] = [];

  form!: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      destination: ['', Validators.required],
      exit: ['', Validators.required],
      duration: ['', Validators.required],
      port: ['', Validators.required],
      boat: ['', Validators.required],
      naviera: ['', Validators.required],
    });
  }

  get destinatioControl(): FormControl{
    return this.form.get('destination') as FormControl;
  }

  get exitControl(): FormControl{
    return this.form.get('exit') as FormControl;
  }

  get durationControl(): FormControl{
    return this.form.get('duration') as FormControl;
  }

  get portControl(): FormControl{
    return this.form.get('port') as FormControl;
  }

  get boatControl(): FormControl{
    return this.form.get('boat') as FormControl;
  }

  get navieraControl(): FormControl{
    return this.form.get('naviera') as FormControl;
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
