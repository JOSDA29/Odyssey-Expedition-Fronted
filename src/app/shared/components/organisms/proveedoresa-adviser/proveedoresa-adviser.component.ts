import { Component } from '@angular/core';

@Component({
  selector: 'app-proveedoresa-adviser',
  templateUrl: './proveedoresa-adviser.component.html',
  styleUrl: './proveedoresa-adviser.component.scss'
})
export class ProveedoresaAdviserComponent {

  titlesTopTransport = [
    {title1:'Servicios', title2: 'Gestión de transportes'}
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
