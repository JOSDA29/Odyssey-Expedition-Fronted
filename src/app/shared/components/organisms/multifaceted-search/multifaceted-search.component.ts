import { Component, Input, OnInit } from '@angular/core';
import { loadComponent } from '../../../../core/services/hotel-update-service.service';

@Component({
  selector: 'app-multifaceted-search',
  templateUrl: './multifaceted-search.component.html',
  styleUrls: ['./multifaceted-search.component.scss']
})
export class MultifacetedSearchComponent implements OnInit {
  @Input() nuberMenu: number = 0;
  imgUrl: string = 'assets/images/fondoHome.png'; // URL predeterminada

  contenButton = [
    { src: 'assets/icons/plane.png', alt: 'plane', text: 'Vuelos', type: 'share-button' },
    { src: 'assets/icons/hotel.png', alt: 'hotel', text: 'Hoteles', type: 'share-button2' },
    { src: 'assets/icons/package.png', alt: 'package', text: 'Paquetes', type: 'share-button' },
    { src: 'assets/icons/cruise.png', alt: 'cruise', text: 'Cruceros', type: 'share-button' }
  ];

  contenSection = [
    {
      title: '¡Busca tu vuelo soñado!',
      section: null,
      origin: 'Origen:',
      destination: 'Destino:',
      dates: 'Fechas:',
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

  constructor(private LoadComponent: loadComponent) {}

  ngOnInit(): void {
    // Leer la URL de la imagen desde localStorage
    const savedImageUrl = localStorage.getItem('imageUrl');
    if (savedImageUrl) {
      this.imgUrl = savedImageUrl;
    }

    // Suscríbete a las actualizaciones del servicio
    this.LoadComponent.loadComponent$.subscribe(() => {
      this.updateImage(); // Actualiza la imagen cuando se recibe una notificación
    });
  }

  updateImage() {
    // Lógica para actualizar la URL de la imagen
    this.imgUrl = 'assets/images/fondo2.png'; // Cambia esto por la nueva URL de la imagen

    // Guardar la nueva URL de la imagen en localStorage
    localStorage.setItem('imageUrl', this.imgUrl);
  }

  onMenuSelected(selectedIndex: number) {
    this.nuberMenu = selectedIndex;
    sessionStorage.setItem('secetionSearch', `${this.nuberMenu}`);
  }
}
