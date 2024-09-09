import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotelCreate } from '../../../../../core/models/hotel/createHotel';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent implements OnInit{
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';
  hotelForm!: FormGroup;

  @Input() inputs = [
    { placeholder: 'Nombre hotel', type: 'text', text: 'Nombre hotel: ',formControlName:'name' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', formControlName: 'destination' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', formControlName: 'startDate'},
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha', formControlName: 'endDate' },
    { placeholder: 'Cantidad de personas', type: 'number', text: 'Numero de personas:',max:12, formControlName: 'numberOfPeople' },
    { placeholder: 'Habitacion', type: 'text', text: 'Habitacion:', formControlName: 'room'},
    { placeholder: 'locacion', type: 'text', text: 'Locacion:', formControlName: 'location'},
    { placeholder: 'Precio', type: 'number', text: 'Precio:', formControlName: 'price'},
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  serviceDescription: string = '';
  hotelDescription: string = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private hotelUpdateService: loadComponent
  ) {
    // Initialize inputValues array to match the inputs structure
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
  }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      destination: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      room: ['', [Validators.required]],
      location: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      serviceDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      hotelDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    }, { validators: this.dateRangeValidator('startDate', 'endDate') });
  }
  

  getFormControl(controlName: string): FormControl {
    const control = this.hotelForm.get(controlName);
    if (!control) {
      throw new Error(`Control with name '${controlName}' not found in the form`);
    }
    return control as FormControl;
  } 

  isControlInvalid(controlName: string): boolean {
    const control = this.hotelForm.get(controlName);
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

  getInputValues(): HotelCreate {
    const {name,destination,startDate,endDate,numberOfPeople,room,location,price} = this.hotelForm.value;
  
    return {
      name,
      destination,
      startDate,
      endDate,
      numberOfPeople,
      room,
      description: this.hotelDescription || '',
      location,
      hotelServices: this.serviceDescription || '',
      price,
      state: true
    };
  }

  saveData(): void {
    if (this.hotelForm.invalid) {
      this.submitted = true;
      this.hotelForm.markAllAsTouched();  // Muestra todos los errores
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
        this.apiService.createHotel(payload).subscribe(
          response => {
            this.sweetAlertService.hideLoading();
            this.hotelUpdateService.notifyHotelUpdated();
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
  const control = this.hotelForm.get(controlName);
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
  if (this.hotelForm.hasError('dateRangeInvalid')) {
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
