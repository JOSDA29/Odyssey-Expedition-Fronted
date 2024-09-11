import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { createPaquete } from '../../../../../core/models/paquetes/crearPaquete';

@Component({
  selector: 'app-add-paquetes',
  templateUrl: './add-paquetes.component.html',
  styleUrl: './add-paquetes.component.scss'
})
export class AddPaquetesComponent implements OnInit{
  @Input() srcImg: string = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  @Input() altImg: string = 'default';
  paqueteForm!: FormGroup;
  @Input() namePaquete: string = 'Nombre paquete'
  @Input() pricePquete: number = 0;

  @Input() inputs = [
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', formControlName: 'startDate'},
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha', formControlName: 'endDate' },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:',formControlName: 'numberOfPeople'},
    { placeholder: 'Origen', type: 'text', text: 'Origen',formControlName:'origin' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', formControlName: 'destination' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  preferenciasCliente: string = '';
  itinerario: string = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddPaquetesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private paqueteUpdateService: loadComponent
  ) {
    // Initialize inputValues array to match the inputs structure
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
  }

  ngOnInit(): void {
    this.paqueteForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      origin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      destination: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      preferenciasCliente: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      itinerario: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    }, { validators: this.dateRangeValidator('startDate', 'endDate') });
  }
  

  getFormControl(controlName: string): FormControl {
    const control = this.paqueteForm.get(controlName);
    if (!control) {
      throw new Error(`Control with name '${controlName}' not found in the form`);
    }
    return control as FormControl;
  } 

  isControlInvalid(controlName: string): boolean {
    const control = this.paqueteForm.get(controlName);
    return control?.touched && control?.invalid || false;
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcImg = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  getInputValues():createPaquete {
    const {origin, destination,departureDate,returnDate,numberOfPeople,itinerary,customerPreferences,state,} = this.paqueteForm.value;
  
    return {
      origin,
      destination,
      departureDate,
      returnDate,
      numberOfPeople,
      itinerary,
      customerPreferences,
      state: true
    };
  }

  saveData(): void {
    if (this.paqueteForm.invalid) {
      this.submitted = true;
      this.paqueteForm.markAllAsTouched();  // Muestra todos los errores
      return;
    }
  
    const payload = this.getInputValues();
  
    this.sweetAlertService.showConfirmation(
      '¿Estás seguro de agregar este hotel?',
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Creando hotel...', '', 'assets/icons/loadingData.gif');
        this.apiService.createPaquete(payload).subscribe(
          response => {
            this.sweetAlertService.hideLoading();
            this.paqueteUpdateService.notifyHotelUpdated();
            this.dialogRef.close(response);
            this.sweetAlertService.showSuccess('Creación exitosa', 'assets/icons/check.gif');
          },
          error => {
            this.sweetAlertService.hideLoading();
            this.sweetAlertService.showError('Error al crear el hotel');
          }
        );
      }
    });
  }  

  cancelData(): void {
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de cancelar?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }
  
getErrorMessage(controlName: string): string {
  const control = this.paqueteForm.get(controlName);
  if (control && control.errors) {
    if (control.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (control.hasError('minlength')) {
      return `Debe tener al menos ${control.errors['minlength']?.requiredLength} caracteres`;
    }
    if (control.hasError('maxlength')) {
      return `No puede tener más de ${control.errors['maxlength']?.requiredLength} caracteres`;
    }
    if (control.hasError('pattern')) {
      return 'Formato inválido';
    }
    if (control.hasError('email')) {
      return 'Email inválido';
    }
  }
  if (this.paqueteForm.hasError('dateRangeInvalid')) {
    return 'La fecha de inicio debe ser menor que la de fin';
  }
  return '';
}

  

  dateRangeValidator(startDate: string, endDate: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const startControl = formGroup.get(startDate);
      const endControl = formGroup.get(endDate);
  
      if (!startControl || !endControl) {
        return null; // No hay controles de fecha para validar
      }
  
      const start = startControl.value;
      const end = endControl.value;
  
      if (start && end && new Date(start) > new Date(end)) {
        return { dateRangeInvalid: true }; // Error si la fecha de inicio es mayor que la de fin
      }
  
      return null; // No hay errores
    };
  }
}
