import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../core/services/api.service';
import { HotelData } from '../../../../core/models/createHotel';

@Component({
  selector: 'app-modal-update-hotel',
  templateUrl: './modal-update-hotel.component.html',
  styleUrls: ['./modal-update-hotel.component.scss']
})
export class ModalUpdateHotelComponent {
  @Input() hover: 'hover-text' | 'hover-add' = 'hover-text';
  @Input() button1: 'Cancelar' = 'Cancelar';
  @Input() button2: 'Guardar' | 'Agregar' = 'Guardar';
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';

  @Input() inputs = [
    { placeholder: 'Nombre hotel', type: 'text', text: 'Nombre hotel: ', dateStar: '', dateFinish: '' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha' },
    { placeholder: 'Cantidad de personas', type: 'number', text: 'Numero de personas:', dateStar: '', dateFinish: '' },
    { placeholder: 'Habitacion', type: 'text', text: 'Habitacion:', dateStar: '', dateFinish: '' },
    { placeholder: 'locacion', type: 'text', text: 'Locacion:', dateStar: '', dateFinish: '' },
    { placeholder: 'Precio', type: 'number', text: 'Precio:', dateStar: '', dateFinish: '' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  serviceDescription: string = '';
  hotelDescription: string = '';

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<ModalUpdateHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
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

    const confirmationMessage = this.button2 === 'Agregar'
      ? `¿Estás seguro de agregar este hotel?`
      : `¿Estás seguro de guardar los cambios?`;

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
      confirmationMessage,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        if (this.button2 === 'Agregar') {
          this.apiService.createHotel(payload).subscribe(
            response => {
              console.log('Hotel agregado exitosamente:', response);
              this.dialogRef.close(response);
            },
            error => {
              console.error('Error al agregar el hotel:', error);
            }
          );
        } else {
          this.dialogRef.close();
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
      }
    });
  }
}

