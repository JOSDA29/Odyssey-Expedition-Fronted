import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotelCreate } from '../../../../../core/models/hotel/createHotel';


@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent {
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';

  @Input() inputs = [
    { placeholder: 'Nombre hotel', type: 'text', text: 'Nombre hotel: ', dateStar: '', dateFinish: '' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha' },
    { placeholder: 'Cantidad de personas', type: 'number', text: 'Numero de personas:', dateStar: '', dateFinish: '',max:12 },
    { placeholder: 'Habitacion', type: 'text', text: 'Habitacion:', dateStar: '', dateFinish: '' },
    { placeholder: 'locacion', type: 'text', text: 'Locacion:', dateStar: '', dateFinish: '' },
    { placeholder: 'Precio', type: 'number', text: 'Precio:', dateStar: '', dateFinish: '' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  serviceDescription: string = '';
  hotelDescription: string = '';

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private hotelUpdateService: loadComponent
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

  getInputValues(): HotelCreate {
    const name = this.inputValues[0]?.value || '';
    const destination = this.inputValues[1]?.value || '';
    const startDate = this.inputValues[2]?.dateStart || '';
    const endDate = this.inputValues[3]?.dateFinish || '';
    const numberOfPeople = +this.inputValues[4]?.value || 0;
    const room = this.inputValues[5]?.value || '';
    const location = this.inputValues[6]?.value || '';
    const price = +this.inputValues[7]?.value || 0;
  
    // Limpiar mensajes de error previos
    this.errorMessages = [];
  
    // Validaciones y mensajes de error
    if (!name) {
      this.errorMessages[0] = 'Campo obligatorio';
    } else if (name.length < 5 || name.length > 20) {
      this.errorMessages[0] = 'El nombre debe tener entre 5 y 20 caracteres';
    }
  
    if (!destination) {
      this.errorMessages[1] = 'Campo obligatorio';
    } else if (destination.length < 5 || destination.length > 255) {
      this.errorMessages[1] = 'El destino debe tener entre 5 y 255 caracteres';
    }
  
    if (!startDate) {
      this.errorMessages[2] = 'Campo obligatorio';
    } else if (new Date(startDate) >= new Date(endDate)) {
      this.errorMessages[2] = 'La fecha de inicio debe ser antes de la fecha de fin';
    }
  
    if (!endDate) {
      this.errorMessages[3] = 'Campo obligatorio';
    }
  
    if (numberOfPeople <= 0) {
      this.errorMessages[4] = 'Campo obligatorio';
    }
  
    if (!room) {
      this.errorMessages[5] = 'Campo obligatorio';
    }
  
    if (!location) {
      this.errorMessages[6] = 'Campo obligatorio';
    }
  
    if (price <= 0) {
      this.errorMessages[7] = 'Campo obligatorio';
    }
    if (!this.serviceDescription) {
      this.errorMessages[8] = 'Campo obligatorio';
    } else if (this.serviceDescription.length < 10 || this.serviceDescription.length > 500) {
      this.errorMessages[8] = 'Caracteres minimos 10 y maximo 250';
    }
    
    if (!this.hotelDescription) {
      this.errorMessages[9] = 'Campo obligatorio';
    } else if (this.hotelDescription.length < 10 || this.hotelDescription.length > 500) {
      this.errorMessages[9] = 'Carecteres minimos 10 y maximo 250';
    }
  
    // Si hay errores, lanzar excepción
    if (this.errorMessages.some(error => error)) {
      throw new Error('Datos inválidos');
    }
  
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
    const payload = this.getInputValues();
    console.log('Datos a enviar:', payload); // Depuración

    // Validaciones adicionales...
    if (payload.name.length < 5 || payload.name.length > 20) {
      this.sweetAlertService.showError('El nombre debe tener entre 5 y 20 caracteres');
      return;
    }

    if (payload.destination.length < 5 || payload.destination.length > 255) {
      this.sweetAlertService.showError('La ciudad de ubicación debe contener entre 5 y 255 caracteres');
      return;
    }

    // Confirmación y llamada al API
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de Agregar este hotel?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
          this.apiService.createHotel(payload).subscribe(
            response => {
              console.log('Hotel agregado exitosamente:', response);
              this.hotelUpdateService.notifyHotelUpdated();
              this.dialogRef.close(response);
            },
            error => {
              console.error('Error al agregar el hotel:', error);
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
