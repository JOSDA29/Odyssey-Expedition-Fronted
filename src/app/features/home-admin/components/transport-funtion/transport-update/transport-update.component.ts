import { ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { updateTransport } from '../../../../../core/models/transport/updateTransport';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transport-update',
  templateUrl: './transport-update.component.html',
  styleUrl: './transport-update.component.scss'
})
export class TransportUpdateComponent {
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';
  cargado: boolean = false
  selectedFile: File | null = null;

  transporteForm!: FormGroup;
  submitted = false;

  @Input() inputs = [
    { placeholder: 'Numero de seguimiento', type: 'text', text: 'Segimiento: ', dateStar: '', dateFinish: '',list:false,formControlName:'trackNumber',isReadOnly:true },
    { placeholder: 'Ingrese el tipo', type: 'text', text: 'Transporte:', dateStar: '', dateFinish: '',list:false,formControlName:'transporttype',isReadOnly:true },
    { placeholder: 'Ingrese la compañia', type: 'text', text: 'Compañia:', dateStar: '', dateFinish: '',list:false,formControlName:'company',isReadOnly:true },
    { placeholder: '', type: '', text: 'Fecha de salida:', dateStar: 'Fecha', dateFinish: '',list:false,formControlName:'departureDate', isReadOnly:false },
    { placeholder: '', type: '', text: 'Fecha de llegada :', dateStar: '', dateFinish: 'Fecha',list:false,formControlName:'arrivalDate', isReadOnly:false },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:',list:false,formControlName:'numberOfPeople', isReadOnly:false },
    { placeholder: 'Ingrese el origen', type: 'text', text: 'Origen:', dateStar: '', dateFinish: '',list:true,formControlName:'origin', isReadOnly:false },
    { placeholder: 'Ingrese el destino', type: 'text', text: 'Destino:', dateStar: '', dateFinish: '',list:true,formControlName:'destination',isReadOnly:false },
    { placeholder: 'Valor instancia', type: 'number', text: 'Precio:', dateStar: '', dateFinish: '',list:false,formControlName:'price', isReadOnly:false },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<TransportUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private transportUpdateService: loadComponent,
    private cdr: ChangeDetectorRef,
  ) {
    // Initialize inputValues array to match the inputs structure
    this.inputValues = this.inputs.map(() => ({ value: '',  dateStart: '', dateFinish: '' }));
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcImg = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }    

  transportId = this.data.item?.id; // Extrae el ID desde data.item

  ngOnInit(): void {
    if (this.transportId) {
      this.sweetAlertService.showLoading('Cargando transporte...','','assets/icons/loadingData.gif');
      this.loadTransportData(this.transportId);
    } else {
      console.error('No ID provided');
    }

    this.transporteForm = this.fb.group({
      trackNumber: ['', [Validators.required, Validators.minLength(5)]],
      transporttype: ['', [Validators.required, Validators.pattern(/^(vuelo|crucero)$/)]], // Se mantiene el patrón original
      company: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      arrivalDate: ['', [Validators.required]],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      origin: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
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

    this.cdr.detectChanges();
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


 getInputValues(): updateTransport {
    const { transporttype, company, origin, destination, arrivalDate, departureDate, numberOfPeople, price, trackNumber } = this.transporteForm.value;
    return {
      transportID: this.transportId,
      transporttype,
      company,
      origin,
      destination,
      arrivalDate,
      departureDate,
      numberOfPeople,
      price,
      state: this.data.item?.state,
      trackNumber
    };
  }
  

  loadTransportData(transportID: string): void {
    this.cargado = false;
    const filters = { transportID };
    this.apiService.filterTransport(filters).subscribe(
      (data: any) => {
        this.cargado = true;
        this.sweetAlertService.hideLoading();
        if (data && data.length > 0) {
          const transport = data[0];
  

          const startDateFormatted = new Date(transport.departuredate).toLocaleDateString('en-CA');
          const endDateFormatted = new Date(transport.arrivaldate).toLocaleDateString('en-CA');
  
          console.log('data of transport:', startDateFormatted, endDateFormatted, transport);
  
          this.transporteForm.patchValue({
            trackNumber:transport.tracknumber || '',
            transporttype: transport.transporttype || '',
            company: transport.company || '',
            departureDate: startDateFormatted,
            arrivalDate: endDateFormatted,
            numberOfPeople:transport.numberofpeople || '',
            origin: transport.origin || '',
            destination: transport.destination || '',
            price: transport.price || 0,
          })

          this.srcImg = transport.imageurl || this.srcImg;
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Error loading transport data:', error);
      }
    );
  }
  
  

  saveData(): void {
    if (this.transporteForm.invalid) {
      this.submitted = true;
      this.transporteForm.markAllAsTouched();
      return;
    }

    const payload = this.getInputValues();
    console.log('Datos a enviar:', payload); // Depuración
  
    // Confirmación y llamada al API
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de actualizar este transport?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Actualizando transport...','','assets/icons/loadingData.gif');
        
        // Si hay un archivo seleccionado, se sube junto con los datos del transport
        if (this.selectedFile) {
          this.apiService.updateImageTransport(this.selectedFile, this.transportId).subscribe(
            imageResponse => {
              // Después de que la imagen se ha subido, actualiza los datos del transport
              this.apiService.updateTransport(payload).subscribe(
                response => {
                  this.sweetAlertService.hideLoading();
                  this.transportUpdateService.notifyHotelUpdated();
                  this.dialogRef.close(response);
                  this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
                },
                error => {
                  console.error('Error al agregar el transport:', error);
                }
              );
            },
            error => {
              console.error('Error al actualizar la imagen:', error);
              this.sweetAlertService.showError('Error al actualizar la imagen');
            }
          );
        } else {
          // Si no hay un archivo seleccionado, solo actualiza los datos del transport
          this.apiService.updateTransport(payload).subscribe(
            response => {
              console.log('transport agregado exitosamente:', response);
              this.transportUpdateService.notifyHotelUpdated();
              this.dialogRef.close(response);
              this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
            },
            error => {
              console.error('Error al agregar el transport:', error);
            }
          );
        }
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
        this.sweetAlertService.showSuccess('Se canceló la atualización', 'assets/icons/error.gif');
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
