import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showContent: boolean = true;

  ngOnInit() {
    const storageValue = localStorage.getItem('isLoggedAdviser'); // Cambia 'someKey' por tu clave real

    // Verifica el valor almacenado y decide si mostrar el contenido
    if (storageValue === 'true') {
      this.showContent = false; // Ocultar contenido si es 'true'
    }
  }
}
