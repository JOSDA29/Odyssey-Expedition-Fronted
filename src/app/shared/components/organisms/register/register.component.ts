import { Component } from '@angular/core';

@Component({
  selector: 'app-register1',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  conten = [
    { title: 'Nombres', placeholder: 'Ingrese sus nombres', field: 'name', type: 'text' },
    { title: 'Apellidos', placeholder: 'Ingrese sus apellidos', field: 'lastName', type: 'text' },
    { title: 'Correo', placeholder: 'Ingrese su correo', field: 'email', type: 'email' },
    { title: 'Contraseña', placeholder: 'Ingrese su contraseña', field: 'password', type: 'password' },
    { title: 'Confirmar contraseña', placeholder: 'Ingrese de nuevo su contraseña', field: 'confirmarContrasena', type: 'password' },
  ]
}
