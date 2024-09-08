import { Component, Input, ViewChild, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { updateHotel } from '../../../../../core/models/hotel/updateHotel';

@Component({
  selector: 'app-modal-update-hotel',
  templateUrl: './modal-update-hotel.component.html',
  styleUrls: ['./modal-update-hotel.component.scss']
})
export class ModalUpdateHotelComponent {
  @Input() button2: 'Guardar' | 'Agregar' = 'Guardar';
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';
  cargado: boolean = false
  selectedFile: File | null = null;

  @Input() inputs = [
    { placeholder: 'Nombre hotel', type: 'text', text: 'Nombre hotel: ', dateStart: '', dateFinish: '' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', dateStart: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStart: 'Fecha', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStart: '', dateFinish: 'Fecha' },
    { placeholder: 'Cantidad de personas', type: 'number', text: 'Numero de personas:', dateStart: '', dateFinish: '' },
    { placeholder: 'Habitacion', type: 'text', text: 'Habitacion:', dateStart: '', dateFinish: '' },
    { placeholder: 'locacion', type: 'text', text: 'Locacion:', dateStart: '', dateFinish: '' },
    { placeholder: 'Precio', type: 'number', text: 'Precio:', dateStart: '', dateFinish: '' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  serviceDescription: string = '';
  hotelDescription: string = '';

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<ModalUpdateHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private hotelUpdateService: loadComponent,
    private cdr: ChangeDetectorRef,
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
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcImg = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }    

  hotelId = this.data.item?.id; // Extrae el ID desde data.item

  ngOnInit(): void {
    if (this.hotelId) {
      this.sweetAlertService.showLoading('Cargando hotel...','','assets/icons/loadingData.gif');
      this.loadHotelData(this.hotelId);
    } else {
      console.error('No ID provided');
    }
    this.cdr.detectChanges();
  }  

  getInputValues(): updateHotel {
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
      id: this.hotelId, // Asigna un ID apropiado aquí si es necesario
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
      state: this.hotelId.state
    };
  }

  loadHotelData(hotelId: string): void {
    this.cargado = false;
    this.apiService.getHotelById(hotelId).subscribe(
      (data: any) => {
        this.cargado = true;
        this.sweetAlertService.hideLoading();
        if (data && data.length > 0) {
          const hotel = data[0]; // Accede al primer objeto en el array
          console.log('Hotel data received from API:', hotel);
          const startDateFormatted = new Date(hotel.startdate).toLocaleDateString('en-CA'); // 'en-CA' produce "yyyy-MM-dd"
          const endDateFormatted = new Date(hotel.enddate).toLocaleDateString('en-CA');
              
          // Asigna los valores a los inputs
          this.inputValues[0].value = hotel.name || '';
          this.inputValues[1].value = hotel.destination || '';
          this.inputValues[2].dateStart = startDateFormatted || '';
          this.inputValues[3].dateFinish = endDateFormatted || '';        
          this.inputValues[4].value = hotel.numberofpeople || 0;
          this.inputValues[5].value = hotel.room || '';
          this.inputValues[6].value = hotel.location || '';
          this.inputValues[7].value = hotel.price || 0;        
          this.hotelDescription = hotel.description || '';
          this.serviceDescription = hotel.services || '';
          this.srcImg = hotel.imageurl || this.srcImg;

          // Debugging
        this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Error loading hotel data:', error);
      }
    );
  }
  

  saveData(): void {
    const payload = this.getInputValues();
    console.log('Datos a enviar:', payload); // Depuración
  
    // Validaciones adicionales...
    if (!payload.name || payload.name.length < 5 || payload.name.length > 20) {
      this.sweetAlertService.showError('El nombre debe tener entre 5 y 20 caracteres');
      return;
    }
  
    if (!payload.destination || payload.destination.length < 5 || payload.destination.length > 255) {
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
        this.sweetAlertService.showLoading('Actualizando hotel...','','assets/icons/loadingData.gif');
        
        // Si hay un archivo seleccionado, se sube junto con los datos del hotel
        if (this.selectedFile) {
          this.apiService.updateImageHotel(this.selectedFile, this.hotelId).subscribe(
            imageResponse => {
              // Después de que la imagen se ha subido, actualiza los datos del hotel
              this.apiService.updateHotel(payload).subscribe(
                response => {
                  console.log('Hotel agregado exitosamente:', response);
                  this.hotelUpdateService.notifyHotelUpdated();
                  this.dialogRef.close(response);
                  this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
                },
                error => {
                  console.error('Error al agregar el hotel:', error);
                }
              );
            },
            error => {
              console.error('Error al actualizar la imagen:', error);
              this.sweetAlertService.showError('Error al actualizar la imagen');
            }
          );
        } else {
          // Si no hay un archivo seleccionado, solo actualiza los datos del hotel
          this.apiService.updateHotel(payload).subscribe(
            response => {
              console.log('Hotel agregado exitosamente:', response);
              this.hotelUpdateService.notifyHotelUpdated();
              this.dialogRef.close(response);
              this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
            },
            error => {
              console.error('Error al agregar el hotel:', error);
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
}

