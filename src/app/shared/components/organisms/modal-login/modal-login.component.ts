import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-login1',
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.scss'
})
export class ModalLoginComponents {
  conten = [
    {title: 'Correo', placeholder:'Ingrese su correo', field:'email', type:'email'},
    {title: 'Contraseña', placeholder:'Ingrese su contraseña',field:'password',type:'password'}
  ]
}
