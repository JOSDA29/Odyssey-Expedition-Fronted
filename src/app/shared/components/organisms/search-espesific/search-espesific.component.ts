import { Component } from '@angular/core';
import { SearchServiceService } from '../../../../core/services/search-service.service';

@Component({
  selector: 'app-search-espesific',
  templateUrl: './search-espesific.component.html',
  styleUrl: './search-espesific.component.scss'
})
export class SearchEspesificComponent {
  contenSection = [
    {
      title: '¡Busca tu vuelo soñado!',
      section: null,
      origin: 'Origen:',
      destination: 'Destino:',
      dates: 'Fechas:',
      ida: '',
      vuelta: '',
      peopple: 'Pasajeros:'
    }
  ];

  checkContens = [
    { label: 'Ida y vuelta', isChecked: true },
    { label: 'Solo ida', isChecked: false },
    { label: 'Multi destino', isChecked: false }
  ];

  contenHotel = [
    {
      section: null,
      destination: 'Destino:',
      dates: 'Fechas:',
      ida: 'Ida',
      vuelta: 'Vuelta',
      rooms: 'Habitaciones:',
      peopple: ''
    }
  ];

  contenPaquete = [
    {
      section: null,
      origin: 'Ogigen:',
      destination: 'Destino:',
      dates: 'Fechas:',
      ida: 'Ida',
      vuelta: 'Vuelta',
      rooms: 'Habitaciones:',
      peopple: ''
    }
  ];

  contenCruseros = [
    {
      section: null,
      destination: 'Destino:',
      exit: 'Mes de salida:',
      duration: 'Duracion:',
      port: 'Puerto de salida:',
      boat: 'Barco',
      naviera: 'Naviera'
    }
  ];
  
  nuberMenu: number = 0;

  constructor() {
    this.slecction();
  }

  slecction() {
    const storedValue = sessionStorage.getItem('secetionSearch');
    this.nuberMenu = storedValue ? Number(storedValue) : 0;
  }



}
