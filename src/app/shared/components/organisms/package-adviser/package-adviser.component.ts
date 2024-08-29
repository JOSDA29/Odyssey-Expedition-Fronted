import { Component } from '@angular/core';

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
    { tex: 'Fecha salida:', input: 'Buscar por llegada', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Fecha llegada:', input: 'Buscar por salida', type: 'text', dateStar:'',dateFinish:'',},
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
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa' },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas' },
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
