import { Component } from '@angular/core';
import { ModalUpdateHotelComponent } from '../../../../features/home-admin/components/hotel-funtions/modal-update-hotel/modal-update-hotel.component';

@Component({
  selector: 'app-proveedoresa-adviser',
  templateUrl: './proveedoresa-adviser.component.html',
  styleUrl: './proveedoresa-adviser.component.scss'
})
export class ProveedoresaAdviserComponent {

  titlesTopTransport = [
    {title1:'', title2: 'Gestión de proveedores'}
  ]

  inputsTansport = [
    { tex: 'Compañia:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'ID/NIT:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Correo:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
  ]

  titlesTransporte = [
    { title: 'Origen' },
    { title: 'Destino' },
    { title: 'ID' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];

  itemsTransport = [
    { tipe:'',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
    { tipe:'',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
  ]


  buttons = [
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa', configModal: { addService: ModalUpdateHotelComponent } },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal: { addService: ModalUpdateHotelComponent } },
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
}
