import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { updateHotel } from '../../../../../core/models/hotel/updateHotel';
import { updatePaquete } from '../../../../../core/models/paquetes/updatePaquetes';

@Component({
  selector: 'app-view-paquete',
  templateUrl: './view-paquete.component.html',
  styleUrls: ['./view-paquete.component.scss']
})
export class ViewPaqueteComponent implements OnInit {
  @Input() srcImg: string = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  @Input() altImg: string = 'default';
  @Input() namePaquete: string = 'Nombre paquete';
  @Input() pricePquete: number = 0;
  cargado: boolean = false;

  @Input() inputs = [
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', formControlName: 'departureDate' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha', formControlName: 'returnDate' },
    { placeholderNumber: 'Cantidad de pasajeros', typeNumber: 'number', number: 'Pasajeros:', formControlName: 'numberOfPeople' },
    { placeholder: 'Nombre paquete', type: 'text', text: 'Nombre del paquete:', formControlName: 'namePackage' },
    { placeholder: 'Origen', type: 'text', text: 'Origen:', formControlName: 'origin' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', formControlName: 'destination' }
  ];

  @Input() titlesPaquete = [
    { title: 'Servicio' },
    { title: 'Precio' },
    { title: 'ID' },
    { title: 'Acciones' }
  ];

  // Este es el arreglo que quieres llenar con los servicios
  itemsPaquete: any[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;

  inputValues: any[] = [];
  errorMessages: string[] = [];
  preferenciasCliente: string = '';
  itinerario: string = '';
  submitted = false;

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<ViewPaqueteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private paqueteUpdateService: loadComponent
  ) {
    // Initialize inputValues array to match the inputs structure
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
  }

  ngOnInit(): void {
    const paqueteId = this.data.item?.name; // Asegúrate de que esto sea el ID correcto
    console.log(paqueteId);
    
    if (paqueteId && !isNaN(Number(paqueteId))) {
      this.sweetAlertService.showLoading('Cargando paquete...', '', 'assets/icons/loadingData.gif');
      this.loadpaquetelService(Number(paqueteId));
      this.loadPaqueteDetails(Number(paqueteId));
    } else {
      console.error('ID de paquete no válido:', paqueteId);
    }
  }


  loadPaqueteDetails(idFilter: number) {
    this.cargado = false;
    const filter: updatePaquete ={
      id: idFilter,
    }   
     console.log('id paquete:', filter);
    
    this.apiService.filterPaquetes(filter).subscribe(
      (response) => {
        this.cargado = true;
        this.sweetAlertService.hideLoading();

        // Assuming response is the package details
        const paquete = response; 
        console.log('Detalles del paquete recibido:', paquete);
        
        // Update input values with package data
        this.inputValues = [
          { value: new Date(paquete.departuredate).toLocaleDateString('en-CA'), dateStart: '', dateFinish: '' },
          { value: new Date(paquete.returndate).toLocaleDateString('en-CA'), dateStart: '', dateFinish: '' },
          { value: paquete.numberofpeople.toString(), dateStart: '', dateFinish: '' },
          { value: paquete.packagename || 'Nombre no disponible', dateStart: '', dateFinish: '' },
          { value: paquete.origin || 'Origen no disponible', dateStart: '', dateFinish: '' },
          { value: paquete.destination || 'Destino no disponible', dateStart: '', dateFinish: '' }
        ];

        // Update additional details
        this.preferenciasCliente = paquete.customerpreferences || 'Preferencias no disponibles';
        this.itinerario = paquete.itinerary || 'Itinerario no disponible';
        this.namePaquete = String(paquete.totalprice);
        this.srcImg = paquete.imageurl || this.srcImg; // Use placeholder if image is null
        this.altImg = paquete.packagename || 'Imagen de paquete';
      },
      (error) => {
        console.error('Error al traer detalles del paquete:', error);
        this.sweetAlertService.hideLoading();
      }
    );
  }

  


  loadpaquetelService(id: number) {
    this.cargado = false;
    console.log('id paquete:', id);
    
    this.apiService.getService(id).subscribe(
      (response) => {
        this.cargado = true;
        this.sweetAlertService.hideLoading();
        const services = response; // Asume que `response` es un array de servicios
        console.log('Servicios recibidos:', services);
        
        // Procesar cada servicio para obtener más detalles si es necesario
        services.forEach((service: any) => {
          if (service.servicetype === 'Hotel') {
            const filters = {
              id: service.serviceid // Filtrar el hotel por su ID
            };
            
            // Llamar al API para obtener más detalles del hotel
            this.apiService.filterHotels(filters).subscribe(
              (response: any) => {
                if (Array.isArray(response)) {
                  console.log('response hotel:', response);
            
                  // Mapear los datos del hotel a un formato más simple
                  const newItems = response.map((hotel: any) => ({
                    name: hotel.name || 'Sin tipo',
                    id: hotel.hotelid.toString() || 'Id no especificado',
                    location: hotel.price || 'Precio no disponible',
                  }));
            
                  // Verificar si los nuevos elementos ya están en itemsPaquete (evitar duplicados)
                  const uniqueItems = newItems.filter(newItem =>
                    !this.itemsPaquete.some(existingItem => existingItem.id === newItem.id)
                  );
            
                  // Agregar solo los elementos únicos al array de paquetes
                  this.itemsPaquete = [...this.itemsPaquete, ...uniqueItems];
                  console.log('itemsPaquete actualizados (hoteles):', this.itemsPaquete);
                } else {
                  console.warn('Respuesta no es un array:', response);
                }
              },
              (error) => {
                console.error('Error al buscar hoteles:', error);
              }
            );
          } else if (service.servicetype === 'vuelo' || 'crucero') {
            const filters = {
              id: service.serviceid // Filtrar el transporte por su ID
            };
            
            // Llamar al API para obtener más detalles del transporte
            this.apiService.filterTransport(filters).subscribe(
              (response: any) => {
                if (Array.isArray(response)) {
                  console.log('response transport:', response);
            
                  // Mapear los datos del transporte a un formato más simple
                  const newItems = response.map((transport: any) => ({
                    name: transport.transporttype || 'Sin tipo',
                    id: transport.transportid.toString() || 'Id no especificado',
                    location: transport.price || 'Precio no disponible',
                  }));
            
                  // Verificar si los nuevos elementos ya están en itemsPaquete (evitar duplicados)
                  const uniqueItems = newItems.filter(newItem =>
                    !this.itemsPaquete.some(existingItem => existingItem.id === newItem.id)
                  );
            
                  // Agregar solo los elementos únicos al array de paquetes
                  this.itemsPaquete = [...this.itemsPaquete, ...uniqueItems];
                  console.log('itemsPaquete actualizados (transportes):', this.itemsPaquete);
                } else {
                  console.warn('Respuesta no es un array:', response);
                }
              },
              (error) => {
                console.error('Error al buscar transportes:', error);
              }
            );
          } else {
            console.log('Otro tipo de servicio:', service.servicetype);
          }
        });
      },
      (error) => {
        console.error('Error al traer servicios:', error);
        this.sweetAlertService.hideLoading();
      }
    );
  }
  
  

  closeVist(): void {
    this.dialogRef.close();
  }
}
