import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent {
  conten = [
    {  title: 'Nombre completo', text: 'Joseph David Quintero Vargas', altIcon: '', srcIcon: '', link:'', textUpdate:'Editar'},
    {  title: 'Documento de identidad', text: 'No proporcionado', altIcon: '', srcIcon: '', link:'', textUpdate:'Agregar'},
    {  title: 'Numero telefonico', text: 'No proporcionado', altIcon: '', srcIcon: '', link:'',  textUpdate:'Agregar'},
    {  title: 'Dirección', text: 'No proporcionado', altIcon: '', srcIcon: '', link:'',  textUpdate:'Agregar'}
  ]
}
