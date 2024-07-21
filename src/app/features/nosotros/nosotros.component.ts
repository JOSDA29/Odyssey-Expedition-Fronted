import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent {

  conten = [
    { title: '+1000 Clientes', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', altIcon: '1', srcIcon: 'assets/icons/profile.png', link: '', textUpdate: '', isEditing: false },
    { title: '+300 Locaciones', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', altIcon: '2', srcIcon: 'assets/icons/profile.png', link: '', textUpdate: '', isEditing: false },
    { title: 'Seguridad en los pagos', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', altIcon: '3', srcIcon: 'assets/icons/profile.png', link: '', textUpdate: '', isEditing: false },
    { title: 'Ayuda en linea directa', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', altIcon: '4', srcIcon: 'assets/icons/profile.png', link: '', textUpdate: '', isEditing: false },
    { title: 'Asistencia a través del chat', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', altIcon: '4', srcIcon: 'assets/icons/profile.png', link: '', textUpdate: '', isEditing: false }
  ];

}
