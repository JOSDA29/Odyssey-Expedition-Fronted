import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { FormControl } from '@angular/forms';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-transport-vew',
  templateUrl: './transport-vew.component.html',
  styleUrl: './transport-vew.component.scss'
})
export class TransportVewComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<TransportVewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService : ApiService,
    private cdr: ChangeDetectorRef,
    private sweetAlertService: SweetAlertService
  ) {}

  @Input() isReadOnly: boolean = true;
  @Input() srcImg: string = '';
  @Input() altImg: string = '';
  cargado: boolean = false

  @Input() inputs = [
    { placeholder: '', type: 'text', text: 'Identificacion: ', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Nombre:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Ciudad:', dateStar: '', dateFinish: '' },
    { placeholderNumber: 'Cantidad de pasajero', typeNumber: 'number', number: 'Pasajeros:'},
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Habitacion:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Direccion:', dateStar: '', dateFinish: '' },
    { placeholder: '', type: 'text', text: 'Precio:', dateStar: '', dateFinish: '' },
  ];

  ngOnInit(): void {
    const transportID = this.data.item?.id; // Extrae el ID desde data.item
  
    if (transportID) {
      this.sweetAlertService.showLoading('Cargando transporte...','','assets/icons/loadingData.gif')
      this.loadTransportlData(transportID);
    } else {
      console.error('No ID provided');
    }
  }  

  loadTransportlData(transportID: string): void {
    const filters = { transportID }; // Envía el ID como parte del objeto de filtros
    this.cargado = false;
    this.apiService.filterTransport(filters).subscribe(
      (response) => {
        this.cargado = true;
        this.sweetAlertService.hideLoading();
        if (response && response.length > 0) {
          const transport = response[0];  
          this.srcImg = transport.imageurl;
          this.altImg = transport.imageurl;
  
          // Formatear las fechas a "yy/mm/dd"
          const startDateFormatted = new Date(transport.departuredate).toLocaleDateString('en-CA');
          const endDateFormatted = new Date(transport.arrivaldate).toLocaleDateString('en-CA');
  
          this.inputs = [
            { placeholder: transport.transportid.toString(), type: 'text', text: 'Id: ', dateStar: '', dateFinish: '' },
            { placeholder: transport.tracknumber, type: 'text', text: 'Segimiento:', dateStar: '', dateFinish: '' },
            { placeholder: transport.transporttype, type: 'text', text: 'Transporte:', dateStar: '', dateFinish: '' },
            { placeholderNumber: transport.numberofpeople, typeNumber: 'number', number: 'Pasajeros:'},
            { placeholder: '', type: '', text: 'Fecha de llegada:', dateStar: startDateFormatted, dateFinish: '' },
            { placeholder: '', type: '', text: 'Fecha de salida:', dateStar: '', dateFinish: endDateFormatted },
            { placeholder: transport.company, type: 'text', text: 'Compañia:', dateStar: '', dateFinish: '' },
            { placeholder: transport.origin, type: 'text', text: 'Origen:', dateStar: '', dateFinish: '' },
            { placeholder: transport.destination, type: 'text', text: 'Destino:', dateStar: '', dateFinish: '' },
            { placeholder: transport.price, type: 'text', text: 'Precio:', dateStar: '', dateFinish: '' },
          ];
  
          this.cdr.detectChanges();
        } else {
          console.error('No transport data found');
        }
      },
      (error) => {
        console.error('Error fetching transport data:', error);
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
