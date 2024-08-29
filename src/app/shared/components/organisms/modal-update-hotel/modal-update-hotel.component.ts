import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-update-hotel',
  templateUrl: './modal-update-hotel.component.html',
  styleUrl: './modal-update-hotel.component.scss'
})
export class ModalUpdateHotelComponent {

    constructor
    (@Inject(MAT_DIALOG_DATA) public data: any,  
      private modalService: ModalService,
      private sweetAlertService:SweetAlertService,
    ){
    }

    
    @Input() srcImg: string = 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2018/06/CO_X-lugares-turi%CC%81sticos-de-Cali-que-te-dejara%CC%81n-sin-palabras.jpg';
    @Input() altImg: string = 'cali';

    @Input() inputs = [
      {placeholder: 'Ingresa el nombre del hotel',type:'text',text:'Nombre:',dateStar: '',dateFinish: ''},
      {placeholder: 'Ciudad en la que esta el hotel',type:'text',text:'Ciudad:',dateStar: '',dateFinish: ''},
      {placeholder: 'Cantidad de personas',type:'number',text:'Numero de personas:',dateStar: '',dateFinish: ''},
      {placeholder: '',type:'',text:'Fecha de inicio:',dateStar: 'Fecha',dateFinish: ''},
      {placeholder: '',type:'',text:'Fecha de fin:',dateStar: 'Fecha',dateFinish: ''},
      {placeholder: 'Ciudad en la que esta el hotel',type:'text',text:'Habitacion:',dateStar: '',dateFinish: ''},
      {placeholder: 'Direccion de hotel',type:'text',text:'Direccion:',dateStar: '',dateFinish: ''},
      {placeholder: 'Descripcion de los servicios',type:'text',text:'Servicios: ',dateStar: '',dateFinish: ''},
      {placeholder: 'Valor de la instancia por dia',type:'text',text:'Precio:',dateStar: '',dateFinish: ''},
    ]

    @ViewChild('fileInput') fileInput!: ElementRef;

    triggerFileInput(): void {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.srcImg = e.target.result; // Actualiza la imagen con la seleccionada
            };

            reader.readAsDataURL(file); // Convierte la imagen a Base64
        }
    }


    seveData():void{
        this.sweetAlertService.showConfirmation(
            `¿Estás seguro de guardar los cambios?`,
            'Confirmación','Aceptar','Cancelar'
          ).then((result) => {
            if (result.isConfirmed) {
              // Actualiza el estado aquí si es necesario
              this.modalService.closeModal('hotelModal');
            }
          });
    }

    cancelData():void{
        this.sweetAlertService.showConfirmation(
            `¿Estás seguro de cancelar los cambios?`,
            'Confirmación','Aceptar','Cancelar'
          ).then((result) => {
            if (result.isConfirmed) {
              // Actualiza el estado aquí si es necesario
              this.modalService.closeModal('hotelModal');
            }
          });
    }

}
