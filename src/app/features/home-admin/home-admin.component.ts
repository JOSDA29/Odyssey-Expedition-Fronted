import { Component } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent {

  selection: string = '';
  subSelecction: string = '';

  menuOptions = [
    {
      selector: 'Ventas',
      srcSelector: 'assets/icons/ventas.png',
      altSelector: 'Icono de Usuarios'
    },
    {
      selector: 'Servicios',
      srcSelector: 'assets/icons/servicio.png',
      altSelector: 'Icono de Reservas',
      subOptions: [
        { subSelector: 'Hoteles' },
        { subSelector: 'Transportes' },
        { subSelector: 'Paquetes' }
      ]
    },
    {
      selector: 'Proveedores',
      srcSelector: 'assets/icons/personas.png',
      altSelector: 'Icono de Paquetes'
    },
    {
      selector: 'Preguntas Frecuentes',
      srcSelector: 'assets/icons/pregunta.png',
      altSelector: 'Icono de Servicios'
    },
    {
      selector: 'Nosotros',
      srcSelector: 'assets/icons/nosotros.png',
      altSelector: 'Icono de Servicios'
    }
  ];

  inputs = [
    { tex: 'Nombre:', input: 'Buscar por nombre', type: 'text' },
    { tex: 'Ubicacion:', input: 'Buscar por ubicacion', type: 'text' },
    { tex: 'ID:', input: 'Buscar por id', type: 'text' },
  ];


  titlesTopTransport = [
    {title1:'Servicios', title2: 'Gestión de transportes'}
  ]

  inputsTansport = [
    { tex: 'Tipo:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Id:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Origen:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Destino:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Fecha salida:', input: '', type: '', dateStar:'Fecha salida',dateFinish:'',},
    { tex: 'Fecha llegada:', input: '', type: '', dateStar:'Fecha llegada',dateFinish:'',},
  ]

  titlesTransporte = [
    { title: 'Tipo' },
    { title: 'Origen' },
    { title: 'Destino' },
    { title: 'ID' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];

  itemsTransport = [
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
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

  

  handleOptionSelected(option: string) {
    this.selection = option;

    if (option === 'Servicios') {
      this.subSelecction = 'Hoteles'; 
    } else {
      this.subSelecction = ''; 
    }

    console.log('Opción seleccionada:', this.selection);
    console.log('Sub-opción seleccionada:', this.subSelecction);
  }

  handleSubOptionSelected(event: { option: string, subOption: string }) {
    this.selection = event.option;
    this.subSelecction = event.subOption;

    console.log('Opción seleccionada:', this.selection);
    console.log('Sub-opción seleccionada:', this.subSelecction);
  }
}
