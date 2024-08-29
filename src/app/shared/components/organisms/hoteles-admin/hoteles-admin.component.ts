import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-hoteles-admin',
  templateUrl: './hoteles-admin.component.html',
  styleUrl: './hoteles-admin.component.scss'
})
export class HotelesAdminComponent {

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
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'',name: 'JeffersonCondiza', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
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
