import { Component, HostListener, OnInit } from '@angular/core';
import { SearchServiceService } from '../../../../core/services/search-service.service';
import { HotelData } from '../../../../core/models/hotel/hotelData';
import { getTransport } from '../../../../core/models/transport/getTransports';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'] // Corregido 'styleUrl' a 'styleUrls'
})
export class SearchPageComponent implements OnInit {

  nuberMenu: number = 0;
  encontrado: boolean = true;
  showSearchEspesific = false;
  isMobile = false;

  public paquetes: getTransport[] = [];
  public vuelos: getTransport[] = []; 
  public cruceros: getTransport[] = [];  
  public hoteles: HotelData[] = [];

  constructor(
    private searchServiceService: SearchServiceService<any> 
  ) { 
    this.slecction();
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 480; // Cambia el límite de pixeles según la medida que desees
  }

  // Detectar cambios en el tamaño de la pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 480;
  }

  toggleSearchEspesific() {
    if (this.isMobile) {
      this.showSearchEspesific = !this.showSearchEspesific;
    }
  }

  slecction() {
    const storedValue = sessionStorage.getItem('secetionSearch');
    this.nuberMenu = storedValue ? Number(storedValue) : 0;
  }

  ngOnInit(): void {
    // Mapea los números del menú a sus correspondientes arrays y etiquetas
    const menuMappings: { [key: number]: { items: any[], label: string } } = {
      0: { items: this.vuelos, label: 'vuelos' },
      1: { items: this.hoteles, label: 'hoteles' },
      2: { items: this.paquetes, label: 'paquetes' },
      3: { items: this.cruceros, label: 'cruceros' },
    };
  
    // Suscríbete al observable de resultados de búsqueda
    this.searchServiceService.searchResults$.subscribe((results) => {
      const menuData = menuMappings[this.nuberMenu]; // Obtén los datos correspondientes al número del menú
  
      if (menuData) {
        if (!results || results.length === 0) { // Si no hay resultados
          menuData.items.length = 0; // Vacía el array
          this.encontrado = false; 
          console.log(`No se encontraron resultados para ${menuData.label}.`);
        } else {
          // Actualiza el array específico con los nuevos resultados
          menuData.items.splice(0, menuData.items.length, ...results);
          this.encontrado = true;
          console.log(`Resultados de la búsqueda ${menuData.label}:`, menuData.items);
        }
      }
    });
  }
}
