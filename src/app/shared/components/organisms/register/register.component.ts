import { Component } from '@angular/core';

@Component({
  selector: 'app-register1',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  conten = [
    {title: 'Nombres', placeholder:'Ingrese sus nombres',},
    {title: 'Apellidos', placeholder:'Ingrese sus apellidos',},
    {title: 'Correo', placeholder:'Ingrese su correo',},
    {title: 'Contraseña', placeholder:'Ingrese su contraseña',},
    {title: 'Confirmar contraseña', placeholder:'Ingrese de nuevo su contraseña',},
  ]
}
