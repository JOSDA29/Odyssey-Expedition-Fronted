import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ModalUpdateHotelComponent } from '../modal-update-hotel/modal-update-hotel.component';
import { ApiService } from '../../../../../core/services/api.service';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';


@Component({
  selector: 'app-view-data-hotel',
  templateUrl: './view-data-hotel.component.html',
  styleUrls: ['./view-data-hotel.component.scss']
})
export class ViewDataHotelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewDataHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService : ApiService,
    private cdr: ChangeDetectorRef,
    private sweetAlertService:SweetAlertService
  ) {}

  @Input() isReadOnly: boolean = true;
  @Input() description: string = '';
  @Input() srcImg: string = '';
  @Input() altImg: string = '';
  @Input() servicio: string = '';
  cargado: boolean = false;

  @Input() inputs = [
    { placeholder: '', type: 'text', text: 'Identificacion: ', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Nombre:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Ciudad:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'number', text: 'Numero de personas:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Habitacion:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Direccion:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Precio:', dateStar: '', dateFinish: '' },
  ];

  ngOnInit(): void {
    const hotelId = this.data.item?.id; // Extrae el ID desde data.item
  
    if (hotelId) {
      this.sweetAlertService.showLoading('Cargando hotel...','','assets/icons/loadingData.gif')
      this.loadHotelData(hotelId);
    } else {
      console.error('No ID provided');
    }
  }  

  loadHotelData(id: string): void {
    this.cargado = false;
    this.apiService.getHotelById(id).subscribe(
      (response) => {
        this.cargado = true
        this.sweetAlertService.hideLoading();
        if (response && response.length > 0) {
          const hotel = response[0]; // Accede al primer objeto en el array
          console.log('Hotel data received from API:', hotel);
          this.description = hotel.description;
          this.srcImg = hotel.imageurl; 
          this.altImg = hotel.imageurl;
          this.servicio = hotel.services;
  
          // Formatear las fechas a "yy/mm/dd"
          const startDateFormatted = new Date(hotel.startdate).toLocaleDateString('en-CA'); // 'en-CA' produce "yyyy-MM-dd"
          const endDateFormatted = new Date(hotel.enddate).toLocaleDateString('en-CA');
  
          this.inputs = [
            { placeholder: hotel.hotelid.toString(), type: 'text', text: 'Identificacion: ', dateStar: '', dateFinish: '' },
            { placeholder: hotel.name, type: 'text', text: 'Nombre:', dateStar: '', dateFinish: '' },
            { placeholder: hotel.destination, type: 'text', text: 'Ciudad:', dateStar: '', dateFinish: '' },
            { placeholder: hotel.numberofpeople.toString(), type: 'number', text: 'Numero de personas:', dateStar: '', dateFinish: '' },
            { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: startDateFormatted, dateFinish: '' },
            { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: endDateFormatted },
            { placeholder: hotel.room, type: 'text', text: 'Habitacion:', dateStar: '', dateFinish: '' },
            { placeholder: hotel.location, type: 'text', text: 'Direccion:', dateStar: '', dateFinish: '' },
            { placeholder: hotel.price, type: 'text', text: 'Precio:', dateStar: '', dateFinish: '' },
          ];
  
          this.cdr.detectChanges();
        } else {
          console.error('No hotel data found');
        }
      },
      (error) => {
        console.error('Error fetching hotel data:', error);
      }
    );
  }
  

  closeVist(): void {
    this.dialogRef.close();
  }

  createFormControl(placeholder: string): FormControl {
    const control = new FormControl('');
    if (this.isReadOnly) {
      control.setValue(placeholder);
    }
    return control;
  }
}
