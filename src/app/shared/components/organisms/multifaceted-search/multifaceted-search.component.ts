import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multifaceted-search',
  templateUrl: './multifaceted-search.component.html',
  styleUrls: ['./multifaceted-search.component.scss']
})
export class MultifacetedSearchComponent {
  @Input() nuberMenu: number = 0;

  contenButton = [
    { src: 'assets/icons/plane.png', alt: 'plane', text: 'Vuelos', type: 'share-button' },
    { src: 'assets/icons/hotel.png', alt: 'hotel', text: 'Hoteles', type: 'share-button2' },
    { src: 'assets/icons/package.png', alt: 'package', text: 'Paquetes', type: 'share-button' },
    { src: 'assets/icons/cruise.png', alt: 'cruise', text: 'Cruceros', type: 'share-button' }
  ];
  
  //vuelos
  contenSection = [
    {
      title: '¡Busca tu vuelo soñado!',
      section: null,
      origin: 'Origen:',
      destination: 'Destino:',
      dates: 'Fechas:',
      ida: 'Ida',
      vuelta: 'Vuelta',
      peopple: 'Pasajeros:'
    }
  ];

  checkContens = [
    { label: 'Ida y vuelta', isChecked: true },
    { label: 'Solo ida', isChecked: false },
    { label: 'Multi destino', isChecked: false }
  ];


  // Hoteles
  contenHotel = [
    {  section: null,
      destination: 'Destino:',
      dates: 'Fechas:',
      ida: 'Ida',
      vuelta: 'Vuelta',
      rooms: 'Habitaciones:',
      peopple: ''
    },
  ]

//Paquetes

contenPaquete = [
  {  section: null,
    origin: 'Ogigen:',
    destination: 'Destino:',
    dates: 'Fechas:',ida: 'Ida',
    vuelta: 'Vuelta',
    rooms: 'Habitaciones:',
    peopple: ''},
]

contenCruseros = [
  {  
    section: null,
    destination: 'Destino:',
    exit: 'Mes de salida:',
    duration: 'Duracion:',
    port: 'Puerto de salida:',
    boat: 'Barco',
    naviera: 'Naviera'
  },
]


  onMenuSelected(selectedIndex: number) {
    this.nuberMenu = selectedIndex;
  }
}
