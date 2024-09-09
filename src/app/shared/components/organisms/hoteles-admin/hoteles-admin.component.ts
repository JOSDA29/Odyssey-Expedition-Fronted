import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { loadComponent } from '../../../../core/services/hotel-update-service.service';
import { ModalUpdateHotelComponent } from '../../../../features/home-admin/components/hotel-funtions/modal-update-hotel/modal-update-hotel.component';
import { ViewDataHotelComponent } from '../../../../features/home-admin/components/hotel-funtions/view-data-hotel/view-data-hotel.component';
import { AddHotelComponent } from '../../../../features/home-admin/components/hotel-funtions/add-hotel/add-hotel.component';

@Component({
  selector: 'app-hoteles-admin',
  templateUrl: './hoteles-admin.component.html',
  styleUrls: ['./hoteles-admin.component.scss']
})
export class HotelesAdminComponent implements OnInit {
  @Input() titlesTopHotel = [ { title1: 'Servicios', title2: 'Gestión de hoteles' } ];
  @Input() isLoading: boolean = false;

  @Input() selects = [
    { text: 'Estado:', option: '', options: [
      { value: 'Todos', label: 'Todos' },
      { value: 'Inactivo', label: 'Inactivo' },
      { value: 'Activo', label: 'Activo' },
    ] }
  ];

  @Input() titlesTransporte = [
    { title: 'Nombre' },
    { title: 'Ubicacion' },
    { title: 'Identificacion' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];

  @Input() inputs = [
    { tex: 'Nombre:', input: 'Buscar por nombre', type: 'text' },
    { tex: 'Ubicación:', input: 'Buscar por ubicacion', type: 'text' },
    { tex: 'ID:', input: 'Buscar por id', type: 'text' },
  ];
  @Input() buttons = [
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa', configModal: { addService: null } },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal: { addService: AddHotelComponent } },
  ];
  @Input() itemsHotel: any[] = [];
  
  inputValues: any[] = [];

  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: ModalUpdateHotelComponent,
    viewComponent: ViewDataHotelComponent
  };

  @Input() modalConfigAdd: { addService: any; } = {
    addService: AddHotelComponent,
  };

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private hotelUpdateService: loadComponent
  ) {
    this.inputValues = this.inputs.map(() => ({ value: '' }));
  }

  ngOnInit() {
    this.hotelUpdateService.loadComponent$.subscribe(() => {
      this.loadHotels(); // Método que recarga los datos de la tabla
    });

    this.loadHotels(); // Cargar los hoteles al iniciar el componente
  }

  loadHotels(): void {
    this.itemsHotel = [];
    this.isLoading = true;
    this.apiService.getHotels().subscribe(
      (response: any) => {
        this.isLoading = false;
        this.itemsHotel = response.map((hotel: any) => ({
          name: hotel.name || 'Sin nombre',
          location: hotel.location || 'Ubicación no especificada',
          id: hotel.hotelid ? hotel.hotelid.toString() : 'ID no disponible',
          isToggled: hotel.state !== undefined ? hotel.state : false
        }));
      },
      (error) => {
        console.error('Error al cargar los hoteles:', error);
      }
    );
  }

  searchHotels(): void {
    const state = this.selectedState === 'Activo' ? true : (this.selectedState === 'Inactivo' ? false : undefined);
    
    const filters = {
      name: this.inputValues[0].value || '',
      location: this.inputValues[1].value || '',
      id: this.inputValues[2].value || '',
      state: state !== undefined ? state : '' // Enviar como string vacío si es undefined
    };
      
    this.itemsHotel = [];
    this.isLoading = true; // Mostrar la imagen de carga antes de la solicitud
    this.apiService.filterHotels(filters).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (Array.isArray(response)) {
          this.itemsHotel = response.map((hotel: any) => ({
            name: hotel.name || 'Sin nombre',
            location: hotel.location || 'Ubicación no especificada',
            id: hotel.hotelid ? hotel.hotelid.toString() : 'ID no disponible',
            isToggled: hotel.state !== undefined ? hotel.state : false
          }));
        } else {
          console.warn('Respuesta no es un array:', response);
          this.itemsHotel = [];
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al buscar hoteles:', error);
      }
    );
  }
  
  onButtonClick(index: number, button: any): void {
    if (index === 0) {
      this.searchHotels();
    } else if (index === 1) {
      this.openModalAdd(button);
    } else {
      console.log(`Botón ${index + 1} clicado`);
    }
  }

  openModalAdd(item: any): void {
    if (this.modalConfigAdd.addService) {
      this.modalService.openModal(this.modalConfigAdd.addService, 'addService', { item });
    } else {
      console.error('El componente addService es null o no está definido.');
    }
  }

  selectedState: string = 'Todos'; // Valor por defecto

  onOptionChange(newValue: string) {
    this.selectedState = newValue;
    this.searchHotels(); // Llama a searchHotels cada vez que cambie el estado
  }
  
}
