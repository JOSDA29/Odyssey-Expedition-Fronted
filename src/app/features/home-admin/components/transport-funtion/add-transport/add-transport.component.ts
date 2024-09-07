import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { CreateTransport } from '../../../../../core/models/transport/createTransport';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrl: './add-transport.component.scss'
})
export class AddTransportComponent {
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';

  @Input() inputs = [
    { placeholder: 'Id', type: 'text', text: 'Id: ', dateStar: '', dateFinish: '' },
    { placeholder: 'Numero de seguimiento', type: 'text', text: 'Segimiento: ', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese el tipo', type: 'text', text: 'Transporte:', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese la compañia', type: 'text', text: 'Compañia:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de llegada :', dateStar: 'Fecha', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de salida:', dateStar: '', dateFinish: 'Fecha' },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:'},
    { placeholder: 'Ingrese el origen', type: 'text', text: 'Origen:', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese el destino', type: 'text', text: 'Destino:', dateStar: '', dateFinish: '' },
    { placeholder: 'Valor instancia', type: 'number', text: 'Precio:', dateStar: '', dateFinish: '' },
    //{ placeholder: 'Ingrese pista / puerto', type: 'text', text: 'Pista / Puerto:', dateStar: '', dateFinish: '' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  serviceDescription: string = '';
  hotelDescription: string = '';

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddTransportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private transportUpload: loadComponent
  ) {
    // Initialize inputValues array to match the inputs structure
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
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
    const transportID = this.inputValues[0]?.value || '';
    const trackNumber = this.inputValues[1]?.value || '';
    let transporttype = this.inputValues[2]?.value || ''; 
    const company = this.inputValues[3]?.value || '';
    const arrivalDate = this.inputValues[4]?.dateStart || '';
    const departureDate = this.inputValues[5]?.dateFinish || '';
    const numberOfPeople = +this.inputValues[6]?.number || 0;
    const origin = this.inputValues[7]?.value || '';
    const destination = this.inputValues[8]?.value || '';
    const price = +this.inputValues[9]?.value || 0;
  
    // Convertir el valor de transporttype a minúsculas
    transporttype = transporttype.toLowerCase();
  
    console.log('Values:', {
      transportID,
      trackNumber,
      transporttype,
      company,
      origin,
      destination,
      arrivalDate,
      departureDate,
      numberOfPeople,
      price
    });
  
    this.errorMessages = [];
  
    if (!transportID) {
      this.errorMessages[0] = 'Campo obligatorio';
    } else if (transportID.length < 3 || transportID.length > 20) {
      this.errorMessages[0] = 'El id debe tener entre 3 y 20 caracteres.';
    }
  
    if (!trackNumber) {
      this.errorMessages[1] = 'Campo obligatorio';
    } else if (trackNumber.length < 3 || trackNumber.length >= 20) {
      this.errorMessages[1] = 'El segimiento debe tener entre 3 y 20 caracteres.';
    }
  
    if (!transporttype) {
      this.errorMessages[2] = 'Campo obligatorio';
    } else if (transporttype !== 'vuelo' && transporttype !== 'crucero') {
      this.errorMessages[2] = 'El tipo de transporte debe ser "crucero" o "vuelo".';
    }
  
    if (!company) {
      this.errorMessages[3] = 'Campo obligatorio';
    }
  
    if (!arrivalDate) {
      this.errorMessages[4] = 'Campo obligatorio';
    } else if (arrivalDate < departureDate) {
      this.errorMessages[4] = 'La fecha de llegada debe ser mayor a la de salida';
    }
  
    if (!departureDate) {
      this.errorMessages[5] = 'Campo obligatorio';
    } else if (departureDate > arrivalDate) {
      this.errorMessages[5] = 'La fecha de salida debe ser menor a la de llegada';
    }
  
    if (!numberOfPeople) {
      this.errorMessages[6] = 'Campo obligatorio';
    }
  
    if (!origin) {
      this.errorMessages[7] = 'Campo obligatorio';
    }else if (origin.length < 10 || origin.length >= 20) {
      this.errorMessages[7] = 'El origen debe tener entre 10 y 20 caracteres.';
    }
  
    if (!destination) {
      this.errorMessages[8] = 'Campo obligatorio';
    }else if (destination.length < 10 || destination.length >= 20) {
      this.errorMessages[8] = 'El destino debe tener entre 10 y 20 caracteres.';
    }
  
    if (!price) {
      this.errorMessages[9] = 'Campo obligatorio';
    }
  
    // Si hay errores, lanzar excepción
    if (this.errorMessages.some(error => error)) {
      throw new Error('Datos inválidos');
    }
  
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
    const payload = this.getInputValues();
    console.log('Datos a enviar:', payload); // Depuración
    // Confirmación y llamada al API
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de actualizar este transporte?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
          this.apiService.createTransport(payload).subscribe(
            response => {
              console.log('Transporte agregado exitosamente:', response);
              this.transportUpload.notifyHotelUpdated();
              this.dialogRef.close(response);
            },
            error => {
              console.error('Error al agregar el transporte:', error);
            }
          );
        
          this.dialogRef.close();
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
}
