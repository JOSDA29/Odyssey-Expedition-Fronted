import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss']
})
export class SecondaryNavbarComponent {
  navLinks = [
    { href: '', text: 'Inicio' },
    { href: '/nosotros', text: 'Nosotros' },
    { href: '/ayuda', text: 'Ayuda' },
  ];

  @Input() showLinks: boolean = true;  
}
