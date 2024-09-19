import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-espesific',
  templateUrl: './search-espesific.component.html',
  styleUrls: ['./search-espesific.component.scss']
})
export class SearchEspesificComponent implements OnInit {
  botonClose = false
  isMobile= false;
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
      origin: 'Origen:',
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

  ngOnInit() {
    // Inicializar isMobile cuando el componente se carga por primera vez
    this.isMobile = window.innerWidth <= 480;
    this.botonClose = window.innerWidth <= 480;
  }

  slecction() {
    const storedValue = sessionStorage.getItem('secetionSearch');
    this.nuberMenu = storedValue ? Number(storedValue) : 0;
    console.log(this.nuberMenu);
  }


  onSearchCompleted() {
    if (this.isMobile) {
      this.nuberMenu = -1;  
    }
  }
}
