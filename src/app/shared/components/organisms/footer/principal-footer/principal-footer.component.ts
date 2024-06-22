import { Component } from '@angular/core';

@Component({
  selector: 'app-principal-footer',
  templateUrl: './principal-footer.component.html',
  styleUrls: ['./principal-footer.component.scss'] // Note the correct 'styleUrls' instead of 'styleUrl'
})
export class PrincipalFooterComponent {
  approachLinks = [
    { text: 'Preguntas frecuentes', url: '#' },
    { text: 'Contactactenos', url: '#' }
  ];

  informationLinks = [
    { text: 'Requisitos de viaje', url: '#' },
    { text: 'Equipo permitido', url: '#' }
  ];

  legalLinks = [
    { text: 'Aerocivil', url: '#' },
    { text: 'Términos y condiciones', url: '#' },
    { text: 'Políticas de privacidad', url: '#' },
    { text: 'Derecho de retracto', url: '#' },
    { text: 'SuperIntendencia (SIC)', url: '#' },
    { text: 'SuperIntendencia de Industria y Comercio (SIC)', url: '#' },
    { text: 'Contrato de transporte - Aerolíneas', url: '#' },
    { text: 'Deberes y derechos del viajero', url: '#' }
  ];

  constructor() { }
}
