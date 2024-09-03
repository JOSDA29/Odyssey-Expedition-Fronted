import { Component } from '@angular/core';
import { ModalUpdateHotelComponent } from '../../../../features/home-admin/components/modal-update-hotel/modal-update-hotel.component';

@Component({
  selector: 'app-package-adviser',
  templateUrl: './package-adviser.component.html',
  styleUrl: './package-adviser.component.scss'
})
export class PackageAdviserComponent {

  titlesTopTransport = [
    {title1:'Servicios', title2: 'Gestión de paquetes'}
  ]

  inputsTansport = [
    { tex: 'ID:', input: 'Buscar por id', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Origen:', input: 'Buscar por origen', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Destino:', input: 'Buscar por destino', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Fecha salida:', input: '', type: '', dateStar:'Fecha salida',dateFinish:'',},
    { tex: 'Fecha llegada:', input: '', type: '', dateStar:'',dateFinish:'Fecha llegada',},
  ]

  titlesTransporte = [
    { title: 'ID' },
    { title: 'Origen' },
    { title: 'Destino' },
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
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa', configModal:{addService:ModalUpdateHotelComponent} },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal:{addService:ModalUpdateHotelComponent} },
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
