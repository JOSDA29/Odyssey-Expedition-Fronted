import { Component } from '@angular/core';
import { ModalUpdateHotelComponent } from '../../../../features/home-admin/components/modal-update-hotel/modal-update-hotel.component';
import { ViewDataHotelComponent } from '../../../../features/home-admin/components/view-data-hotel/view-data-hotel.component';
import { AddHotelComponent } from '../../../../features/home-admin/components/add-hotel/add-hotel.component';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-hoteles-admin',
  templateUrl: './hoteles-admin.component.html',
  styleUrl: './hoteles-admin.component.scss'
})
export class HotelesAdminComponent {

  constructor(
    private apiService: ApiService,
  ){}

  modalConfigHotel = {
    editComponent: ModalUpdateHotelComponent,
    viewComponent: ViewDataHotelComponent
  }

  titlesTopTransport = [
    {title1:'Servicios', title2: 'Gestión de hoteles'}
  ]

  inputsTansport = [
    { tex: 'Nombre:', input: 'Buscar por nombre', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Ubicacion:', input: 'Buscar por unicacion', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'ID:', input: 'Buscar por id', type: 'text', dateStar:'',dateFinish:'',},
  ]

  titlesTransporte = [
    { title: 'Nombre' },
    { title: 'Ubicacion' },
    { title: 'Identificacion' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];

  itemsTransport = [
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
 ]

  buttons = [
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa' },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal:{ addService: AddHotelComponent} },
  ];

  selects = [
    {
      text: 'Estado:',
      option: '',
      options: [
        { value: 'Todos', label: 'Todos' },
        { value: 'Inactivo', label: 'Inactivo' },
        { value: 'Activo', label: 'Activo' },
      ]
    },
  ];

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.apiService.getHotels().subscribe(
      (response: any) => {
        console.log('Datos recibidos del API:', response);
  
        this.itemsTransport = response.map((hotel: any) => ({
          name: hotel.name || 'Sin nombre',
          location: hotel.destination || 'Ubicación no especificada',
          id: hotel.hotelid ? hotel.hotelid.toString() : 'ID no disponible',
          isToggled: hotel.state !== undefined ? hotel.state : false
        }));        
      },
      (error) => {
        console.error('Error al cargar los hoteles:', error);
      }
    );
  }
  

  
}
