import { Component, Inject, input, Input } from '@angular/core';
import { ModalUpdateHotelComponent } from '../modal-update-hotel/modal-update-hotel.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-data-hotel',
  templateUrl: './view-data-hotel.component.html',
  styleUrl: './view-data-hotel.component.scss'
})
export class ViewDataHotelComponent {

  constructor
  ( 
    public dialogRef: MatDialogRef<ModalUpdateHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  }

  @Input() isReadOnly: boolean = true;
  @Input() description: string = 'Santiago de Cali, es la capital del departamento del Valle del Cauca y la tercera ciudad más poblada de Colombia. Fue fundada el 25 de julio de 1536 por Sebastián de Belalcázar, convirtiéndola en una de las ciudades más antiguas de América.'  
  @Input() srcImg: string = 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2018/06/CO_X-lugares-turi%CC%81sticos-de-Cali-que-te-dejara%CC%81n-sin-palabras.jpg';
  @Input() altImg: string = 'cali';
  @Input() servicio: string = 'Descripcion de los servicios';

  @Input() inputs = [
    {placeholder: 'Id default',type:'text',text:'Identificacion: ',dateStar: '',dateFinish: ''},
    {placeholder: 'La posada',type:'text',text:'Nombre:',dateStar: '',dateFinish: ''},
    {placeholder: 'Jardin del edem',type:'text',text:'Ciudad:',dateStar: '',dateFinish: ''},
    {placeholder: '1',type:'number',text:'Numero de personas:',dateStar: '',dateFinish: ''},
    {placeholder: '',type:'',text:'Fecha de inicio:',dateStar: '29/11/24',dateFinish: ''},
    {placeholder: '',type:'',text:'Fecha de fin:',dateStar: '01/01/25',dateFinish: ''},
    {placeholder: 'P2 B12',type:'text',text:'Habitacion:',dateStar: '',dateFinish: ''},
    {placeholder: 'El crusero cr 29 ed3',type:'text',text:'Direccion:',dateStar: '',dateFinish: ''},
    {placeholder: '2.000.000',type:'text',text:'Precio:',dateStar: '',dateFinish: ''},
  ]

    // Método para crear un FormControl y asignar el valor si es readonly
    createFormControl(placeholder: string): FormControl {
      const control = new FormControl('');
      if (this.isReadOnly) {
        control.setValue(placeholder); // Asigna el valor del placeholder solo si es readonly
      }
      return control;
    }

  closeVist():void{
    this.dialogRef.close();            
  }

}
