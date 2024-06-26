import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrl: './secondary-navbar.component.scss'
})
export class SecondaryNavbarComponent {
  navLinks = [
    { href: '', text: 'Inicio' },
    { href: '/nosotros', text: 'Nosotros' },
    { href: '/ayuda', text: 'Ayuda' },
  ];

  @Input() srcicon:string = 'assets/icons/profile.png'
}
