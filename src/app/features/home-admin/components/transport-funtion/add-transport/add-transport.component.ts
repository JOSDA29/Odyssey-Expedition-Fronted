import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { CreateTransport } from '../../../../../core/models/transport/createTransport';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrl: './add-transport.component.scss'
})
export class AddTransportComponent {
  @Input() srcImg: string = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  @Input() altImg: string = 'default';

  transporteForm!: FormGroup;
  submitted = false;

  @Input() inputs = [
    { placeholder: 'Id', type: 'text', text: 'Id: ', dateStar: '', dateFinish: '',list:false,formControlName:'transportID' },
    { placeholder: 'Numero de seguimiento', type: 'text', text: 'Segimiento: ', dateStar: '', dateFinish: '',list:false,formControlName:'trackNumber' },
    { placeholder: 'Ingrese el tipo', type: 'text', text: 'Transporte:', dateStar: '', dateFinish: '',list:false,formControlName:'transporttype' },
    { placeholder: 'Ingrese la compañia', type: 'text', text: 'Compañia:', dateStar: '', dateFinish: '',list:false,formControlName:'company' },
    { placeholder: '', type: '', text: 'Fecha de salida:', dateStar: 'Fecha', dateFinish: '',list:false,formControlName:'departureDate' },
    { placeholder: '', type: '', text: 'Fecha de llegada :', dateStar: '', dateFinish: 'Fecha',list:false,formControlName:'arrivalDate' },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:',list:false,formControlName:'numberOfPeople' },
    { placeholder: 'Ingrese el origen', type: 'text', text: 'Origen:', dateStar: '', dateFinish: '',list:true,formControlName:'origin' },
    { placeholder: 'Ingrese el destino', type: 'text', text: 'Destino:', dateStar: '', dateFinish: '',list:true,formControlName:'destination' },
    { placeholder: 'Valor instancia', type: 'number', text: 'Precio:', dateStar: '', dateFinish: '',list:false,formControlName:'price' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddTransportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private transportUpload: loadComponent
  ) {
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
  }

  ngOnInit(): void {
    this.transporteForm = this.fb.group({
      transportID: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      trackNumber: ['', [Validators.required, Validators.minLength(5)]],
      transporttype: ['', [Validators.required, Validators.pattern(/^(vuelo|crucero)$/)]], // Se mantiene el patrón original
      company: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      price: ['', [Validators.required]]
    }, {
      validators: this.dateRangeValidator
    });
  
    // Escuchar cambios en el campo 'transporte' y convertir a minúsculas automáticamente
    this.transporteForm.get('transporte')?.valueChanges.subscribe((value: string) => {
      const lowerCaseValue = value?.toLowerCase() || '';
      this.transporteForm.get('transporte')?.setValue(lowerCaseValue, { emitEvent: false });
    });
  }
  

  // Validador personalizado para verificar la fecha de inicio y fin
  dateRangeValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const dateStar = group.get('dateStar')?.value;
    const dateFinish = group.get('dateFinish')?.value;
    
    if (dateStar && dateFinish && new Date(dateStar) >= new Date(dateFinish)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }

  getFormControl(controlName: string): FormControl {
    const control = this.transporteForm.get(controlName);
    if (!control) {
      throw new Error(`Control with name '${controlName}' not found in the form`);
    }
    return control as FormControl;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.transporteForm.get(controlName);
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

  getInputValues(): CreateTransport {
    const { transportID, transporttype, company, origin, destination, arrivalDate, departureDate, numberOfPeople, price, trackNumber } = this.transporteForm.value;
    return {
      transportID,
      transporttype,
      company,
      origin,
      destination,
      arrivalDate,
      departureDate,
      numberOfPeople,
      price,
      state: true,
      trackNumber
    };
  }

  saveData(): void {
    if (this.transporteForm.invalid) {
      this.submitted = true;
      this.transporteForm.markAllAsTouched();
      return;
    }

    const payload = this.getInputValues();

    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de actualizar este transporte?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Creando transporte...', '', 'assets/icons/loadingData.gif');
        this.apiService.createTransport(payload).subscribe(
          response => {
            this.sweetAlertService.hideLoading();
            this.transportUpload.notifyHotelUpdated();
            this.dialogRef.close(response);
            this.sweetAlertService.showSuccess('Creación exitosa', 'assets/icons/check.gif');
          },
          error => {
            this.sweetAlertService.hideLoading();
            console.error('Error al agregar el transporte:', error);
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
    const control = this.transporteForm.get(controlName);
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'Campo obligatorio';
      }
      if (control.hasError('pattern') && controlName === 'transporte') {
        return 'El transporte debe ser "Vuelo" o "Crucero"';
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
    if (this.transporteForm.hasError('dateRangeInvalid')) {
      return 'La fecha de inicio debe ser menor que la de fin';
    }
    return '';
  }
}
