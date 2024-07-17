import { Component } from '@angular/core';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent {
  conten = [
    {  title: 'Datos personales', text: 'Proporciona tus datos personales e indícanos cómo podemos ponernos en contacto contigo', altIcon: 'icon-personal', srcIcon: 'assets/icons/profile.png', link:'/personalInfo', textUpdate:''},
    {  title: 'Inicio sesión y seguridad', text: 'Actualiza la contraseña y protege tu cuenta', altIcon: 'icon-contact', srcIcon: 'assets/icons/profile.png', link:'/register', textUpdate:''},
    {  title: 'Historial de reservas', text: 'Revisa todas la reservas ue haz realizado hasta el momento', altIcon: 'icon-contact', srcIcon: 'assets/icons/profile.png', link:'/',  textUpdate:''}
  ]
}
