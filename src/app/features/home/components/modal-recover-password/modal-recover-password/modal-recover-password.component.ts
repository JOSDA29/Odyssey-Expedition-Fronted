import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-recover-password',
  templateUrl: './modal-recover-password.component.html',
  styleUrl: './modal-recover-password.component.scss'
})
export class ModalRecoverPasswordComponent {
  conten = [
    {title: 'Correo registrado', placeholder:'Ingrese el correo registrado', field:'email', type:'email'},
  ]
}
