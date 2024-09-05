import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api.service';
import { HotelUpdateService } from '../../../../core/services/hotel-update-service.service';
import { HotelData } from '../../../../core/models/createHotel';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrl: './add-transport.component.scss'
})
export class AddTransportComponent {
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';

  @Input() inputs = [
    { placeholder: 'Numero de seguimiento', type: 'text', text: 'Segimiento: ', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese el tipo', type: 'text', text: 'Transporte:', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese la compañia', type: 'text', text: 'Compañia:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha' },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:'},
    { placeholder: 'Ingrese el origen', type: 'text', text: 'Origen:', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese el destino', type: 'text', text: 'Destino:', dateStar: '', dateFinish: '' },
    { placeholder: 'Valor instancia', type: 'number', text: 'Precio:', dateStar: '', dateFinish: '' },
    { placeholder: 'Ingrese pista / puerto', type: 'text', text: 'Pista / Puerto:', dateStar: '', dateFinish: '' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  serviceDescription: string = '';
  hotelDescription: string = '';

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddTransportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private hotelUpdateService: HotelUpdateService
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

  getInputValues(): HotelData {
    const name = this.inputValues[0]?.value || '';
    const destination = this.inputValues[1]?.value || '';
    const startDate = this.inputValues[2]?.dateStart || '';
    const endDate = this.inputValues[3]?.dateFinish || '';
    const numberOfPeople = +this.inputValues[4]?.value || 0;
    const room = this.inputValues[5]?.value || '';
    const location = this.inputValues[6]?.value || '';
    const price = +this.inputValues[7]?.value || 0;

    // Validaciones previas al envío
    if (!name || !destination || !startDate || !endDate || !room || !location || price <= 0 || numberOfPeople <= 0) {
      this.sweetAlertService.showError('Por favor, completa todos los campos obligatorios correctamente.');
      throw new Error('Datos inválidos');
    }

    if (new Date(startDate) > new Date(endDate)) {
      this.sweetAlertService.showError('La fecha de inicio no puede ser posterior a la fecha de fin.');
      throw new Error('Fechas inválidas');
    }

    return {
      name,
      destination,
      startDate: startDate,
      endDate: endDate,
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
      `¿Estás seguro de actualizar este hotel?`,
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
