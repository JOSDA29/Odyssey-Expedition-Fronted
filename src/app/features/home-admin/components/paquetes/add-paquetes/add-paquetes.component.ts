import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { createPaquete } from '../../../../../core/models/paquetes/crearPaquete';
import { addService } from '../../../../../core/models/paquetes/addService';

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
  @Input() seekerItems = [
    { title:'Agregar transporte',placeholder: 'ID de un transporte existente', type: 'text', text: 'Id del transporte:',formControlName:'seekerTransporte' },
    { title:'Agregar hotel',placeholder: 'ID de un hotel existente', type: 'text', text: 'Id del hotel:',formControlName:'seekerHotel' },
  ]

  @Input() inputs = [
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', formControlName: 'departureDate'},
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha', formControlName: 'returnDate' },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:',formControlName: 'numberOfPeople'},
    { placeholder: 'Origen', type: 'text', text: 'Origen',formControlName:'origin' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', formControlName: 'destination' },
  ];

  @Input()  titlesPaquete = [
    { title: 'Servicio' },
    { title: 'Precio' },
    { title: 'ID' },
    { title: 'Acciones' }
  ];
  itemsPaquete: any[] = []

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  preferenciasCliente: string = '';
  itinerario: string = '';
  submitted = false;
  selectedFile!: File; //almacena la magen

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
      seekerTransporte:['',[Validators.required]],
      seekerHotel: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
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
      this.selectedFile = input.files[0];  // Almacena el archivo seleccionado
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcImg = e.target.result;  // Muestra la vista previa de la imagen
      };
      reader.readAsDataURL(this.selectedFile);  // Lee el archivo para mostrar la imagen
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
      itinerary: this.itinerario,
      customerPreferences: this.preferenciasCliente,
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
    console.log('data paquete enviada: ', payload);
    
  
    this.sweetAlertService.showConfirmation(
      '¿Estás seguro de agregar este hotel?',
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Creando hotel...', '', 'assets/icons/loadingData.gif');
        this.apiService.createPaquete(payload).subscribe(
          (response:any) => {
            this.sweetAlertService.hideLoading();
            const newPaqueteId = response.packageId;
            console.log('ID del nuevo paquete:', newPaqueteId);

            if (this.selectedFile !== null) {
              this.apiService.updateImagePaquete(this.selectedFile, newPaqueteId).subscribe(
                (res) => {
                  console.log('Imagen actualizada correctamente:', res);
                  this.sweetAlertService.showSuccess('Paquete creado con éxito', 'assets/icons/check.gif');
                },
                (err) => {
                  console.error('Error al subir la imagen:', err);
                  this.sweetAlertService.showError('Error al subir la imagen');
                }
              );              
            }

            const { idTransporte, idHotel } = this.classifyItemsPaquete();                

            const addServicesHotel:addService = {
              idPackage: String(newPaqueteId),
              idHotel: idHotel[0],
            }
            console.log('data hotel: ', addServicesHotel);

              if (addServicesHotel !== undefined && idHotel.length > 0 ) {
                this.apiService.addPaqueteHotel(addServicesHotel).subscribe(
                  response =>{
                    console.log('hotel service add: ',response);
                  },
                  error => {
                    this.sweetAlertService.hideLoading();
                    this.sweetAlertService.showError('Error al agregar el servisio hotel: ', error);
                  }
                );
              }

            const addServicesTransporte:addService = {
              idPackage: String(newPaqueteId),
              idTransport: idTransporte[0],
              numberOfPeople: this.getFormControl('numberOfPeople').value
            }

            if (addServicesTransporte !== undefined && idTransporte.length > 0) {
              this.apiService.addPaqueteTransporte(addServicesTransporte).subscribe(
                response =>{
                  console.log('transporte service add: ',response);
                },
                error => {
                  this.sweetAlertService.hideLoading();
                  this.sweetAlertService.showError('Error al agregar el servisio transporte: ', error);
                }
              );
            }            

            this.paqueteUpdateService.notifyHotelUpdated();
            this.dialogRef.close(response);
            this.sweetAlertService.showSuccess('Creación exitosa', 'assets/icons/check.gif');
          },
          error => {
            this.sweetAlertService.hideLoading();
            this.sweetAlertService.showError('Error al crear el paquete');
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

  searchAndAddToPaquete(index: number): void{
    if (index == 0) {
      const transportID = this.paqueteForm.get('seekerTransporte')?.value;
      const filters = { transportID };
      if (!transportID || transportID === '0') {
        console.warn('ID del transporte no válido, no se realizará la consulta.');
        return; // Detener la ejecución si el ID no es válido
      }
      
      this.apiService.filterTransport(filters).subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            console.log('response transport:', response);
      
            // Filtrar los datos existentes para evitar duplicados
            const newItems = response.map((transport: any) => ({
              name: transport.transporttype || 'Sin tipo',
              id: transport.transportid || 'Id no especificado',
              location: transport.price || 'Precio no disponible',
            }));
      
            // Verificar si los nuevos elementos ya están en itemsPaquete
            const uniqueItems = newItems.filter(newItem =>
              !this.itemsPaquete.some(existingItem => existingItem.id === newItem.id)
            );
      
            // Agregar solo los elementos únicos
            this.itemsPaquete = [...this.itemsPaquete, ...uniqueItems];
          } else {
            console.warn('Respuesta no es un array:', response);
          }
        },
        (error) => {
          console.error('Error al buscar transportes:', error);
        }
      );
    }else if (index == 1) {
      const id = this.paqueteForm.get('seekerHotel')?.value;
      const filters = { id };
      console.log('hotelk id',id);
      
      if (!id || id === '0') {
        console.warn('ID del hotel no válido, no se realizará la consulta.');
        return; // Detener la ejecución si el ID no es válido
      }
      
      this.apiService.filterHotels(filters).subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            console.log('response transport:', response);
      
            // Filtrar los datos existentes para evitar duplicados
            const newItems = response.map((hotel: any) => ({
              name: hotel.name || 'Sin tipo',
              id: hotel.hotelid.toString() || 'Id no especificado',
              location: hotel.price || 'Precio no disponible',
            }));
      
            // Verificar si los nuevos elementos ya están en itemsPaquete
            const uniqueItems = newItems.filter(newItem =>
              !this.itemsPaquete.some(existingItem => existingItem.id === newItem.id)
            );
      
            // Agregar solo los elementos únicos
            this.itemsPaquete = [...this.itemsPaquete, ...uniqueItems];
            console.log(this.itemsPaquete);
          } else {
            console.warn('Respuesta no es un array:', response);
          }
        },
        (error) => {
          console.error('Error al buscar hoteles:', error);
        }
      );
    }
  }


  // Método para clasificar los IDs de itemsPaquete en idTransporte o idHotel
classifyItemsPaquete(): { idTransporte: string[], idHotel: string[] } {
  const idTransporte: string[] = [];
  const idHotel: string[] = [];

  this.itemsPaquete.forEach(item => {
    // Verifica el tipo de servicio: puede ser 'vuelo' o 'crucero' (caso de idTransporte)
    if (item.name.toLowerCase().includes('vuelo') || item.name.toLowerCase().includes('crucero')) {
      idTransporte.push(item.id);
    } else {
      // De lo contrario, se clasifica como idHotel
      idHotel.push(item.id);
    }
  });

  return { idTransporte, idHotel };
}

}
