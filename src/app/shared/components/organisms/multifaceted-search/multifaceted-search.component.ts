import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-multifaceted-search',
  templateUrl: './multifaceted-search.component.html',
  styleUrl: './multifaceted-search.component.scss'
})
export class MultifacetedSearchComponent {
  contenButton = [
    { src: 'assets/icons/plane.png', alt: 'plane', text: 'Vuelos', type: 'share-button' },
    { src: 'assets/icons/hotel.png', alt: 'hotel', text: 'Hoteles', type: 'share-button2' },
    { src: 'assets/icons/package.png', alt: 'package', text: 'Paquetes', type: 'share-button' },
    { src: 'assets/icons/cruise.png', alt: 'cruise', text: 'Cruceros', type: 'share-button' }
  ];
  
contenSection=[
  {
    title: '¡Busca tu vuelo soñado!',
    section: null,
    origin: 'Origen:',
    destination: 'Destino:',
    dates: 'Fechas:',
    ida:'Ida',
    vuelta:'Vuelta',
    peopple: 'Pasajeros:'
  },
]
checkContens = [
  { label: 'Ida y vuelta', isChecked: false },
  { label: 'Solo ida', isChecked: false },
  { label: 'Multi destino', isChecked: false }
];

}
