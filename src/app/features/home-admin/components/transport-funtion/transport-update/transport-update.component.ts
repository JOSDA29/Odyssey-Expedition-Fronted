import { ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { updateTransport } from '../../../../../core/models/transport/updateTransport';

@Component({
  selector: 'app-transport-update',
  templateUrl: './transport-update.component.html',
  styleUrl: './transport-update.component.scss'
})
export class TransportUpdateComponent {
  @Input() button2: 'Guardar' | 'Agregar' = 'Guardar';
  @Input() srcImg: string = 'https://example.com/default-image.jpg';
  @Input() altImg: string = 'default';
  cargado: boolean = false
  selectedFile: File | null = null;

  @Input() inputs = [
    { placeholder: 'Numero de seguimiento', type: 'text', text: 'Segimiento: ', dateStart: '', dateFinish: '',isReadOnly:true },
    { placeholder: 'Ingrese el tipo', type: 'text', text: 'Transporte:', dateStart: '', dateFinish: '',isReadOnly:true },
    { placeholder: 'Ingrese la compañia', type: 'text', text: 'Compañia:', dateStart: '', dateFinish: '',isReadOnly:true },
    { placeholder: '', type: '', text: 'Fecha de llegada :', dateStart: 'Fecha', dateFinish: '',isReadOnly:false },
    { placeholder: '', type: '', text: 'Fecha de salida:', dateStart: '', dateFinish: 'Fecha',isReadOnly:false },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:',isReadOnly:false},
    { placeholder: 'Ingrese el origen', type: 'text', text: 'Origen:', dateStart: '', dateFinish: '',isReadOnly:false },
    { placeholder: 'Ingrese el destino', type: 'text', text: 'Destino:', dateStart: '', dateFinish: '',isReadOnly:false },
    { placeholder: 'Valor instancia', type: 'number', text: 'Precio:', dateStart: '', dateFinish: '',isReadOnly:false },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];

  constructor(
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

  transportId = this.data.item?.id; // Extrae el ID desde data.item

  ngOnInit(): void {
    if (this.transportId) {
      this.sweetAlertService.showLoading('Cargando transport...','','assets/icons/loadingData.gif');
      this.loadTransportData(this.transportId);
    } else {
      console.error('No ID provided');
    }
    this.cdr.detectChanges();
  }  

  getInputValues(): updateTransport {
    const transportID = this.transportId;
    const arrivalDate = this.inputValues[3]?.dateStart || '';
    const departureDate = this.inputValues[4]?.dateFinish || '';
    const numberOfPeople = this.inputValues[5]?.number || 0;
    const origin = this.inputValues[6]?.value || '';
    const destination = this.inputValues[7]?.value || '';
    const price = this.inputValues[8]?.value || 0;
  
    // Debugging: Log captured values
    console.log('Arrival Date:', arrivalDate);
    console.log('Departure Date:', departureDate);
    console.log('Number of People:', numberOfPeople);
    console.log('Origin:', origin);
    console.log('Destination:', destination);
    console.log('Price:', price);
    
    this.errorMessages = [];
  
    if (!arrivalDate) {
      this.errorMessages[3] = 'Campo obligatorio';
    } else if (new Date(arrivalDate) < new Date(departureDate)) {
      this.errorMessages[3] = 'La fecha de llegada debe ser mayor a la de salida';
    }
  
    if (!departureDate) {
      this.errorMessages[4] = 'Campo obligatorio';
    }
  
    if (!numberOfPeople) {
      this.errorMessages[5] = 'Campo obligatorio';
    }
  
    if (!origin) {
      this.errorMessages[6] = 'Campo obligatorio';
    } else if (origin.length < 10 || origin.length >= 20) {
      this.errorMessages[6] = 'El origen debe tener entre 10 y 20 caracteres.';
    }
  
    if (!destination) {
      this.errorMessages[7] = 'Campo obligatorio';
    } else if (destination.length < 10 || destination.length >= 20) {
      this.errorMessages[7] = 'El destino debe tener entre 10 y 20 caracteres.';
    }
  
    if (!price) {
      this.errorMessages[8] = 'Campo obligatorio';
    }
  
    // Si hay errores, lanzar excepción
    if (this.errorMessages.some(error => error)) {
      console.log('Errores encontrados:', this.errorMessages);
      throw new Error('Datos inválidos');
    }
  
    // Debugging: Log final object
    return {
      transportID,
      origin,
      destination,
      arrivalDate,
      departureDate,
      numberOfPeople,
      price,
      state: true,
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
  
          console.log('data of transport:', startDateFormatted, endDateFormatted);
  
          this.inputValues[0].value = transport.tracknumber || '';
          this.inputValues[1].value = transport.transporttype || '';
          this.inputValues[2].value = transport.company || '';
          this.inputValues[3].dateStart = endDateFormatted; 
          this.inputValues[4].dateFinish = startDateFormatted;           
          this.inputValues[5].number = transport.numberofpeople || ''; 
          this.inputValues[6].value = transport.origin || '';
          this.inputValues[7].value = transport.destination || '';
          this.inputValues[8].value = transport.price || '';
  
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
    const payload = this.getInputValues();
    console.log('Datos a enviar:', payload); // Depuración
  
    if (!payload.destination || payload.destination.length < 5 || payload.destination.length > 255) {
      this.sweetAlertService.showError('La ciudad de ubicación debe contener entre 5 y 255 caracteres');
      return;
    }
  
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
                  console.log('transport agregado exitosamente:', response);
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
}
