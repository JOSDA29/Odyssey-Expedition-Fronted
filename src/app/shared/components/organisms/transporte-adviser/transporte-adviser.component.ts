import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { ApiService } from '../../../../core/services/api.service';
import { AddTransportComponent } from '../../../../features/home-admin/components/transport-funtion/add-transport/add-transport.component';
import { loadComponent } from '../../../../core/services/hotel-update-service.service';
import { TransportUpdateComponent } from '../../../../features/home-admin/components/transport-funtion/transport-update/transport-update.component';
import { TransportVewComponent } from '../../../../features/home-admin/components/transport-funtion/transport-vew/transport-vew.component';

@Component({
  selector: 'app-transporte-adviser',
  templateUrl: './transporte-adviser.component.html',
  styleUrls: ['./transporte-adviser.component.scss']
})
export class TransporteAdviserComponent {

  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
    private transportUpload: loadComponent,
  ) {}

  @Input() titlesTopTransport= [    {title1:'Servicios', title2: 'Gestión de transportes'}  ];
  @Input() styleHeader: 'header' | 'headerTransporte' = 'header';
  @Input() butons: 'butons1' | 'butons2' = 'butons1';
  @Input() conten: 'conten' | 'conten2' = 'conten';
  @Input() isLoading: boolean = false; // estado de carga

  inputValues: any[] = [];

  @Input() inputs = [
    { tex: 'Tipo:', input: 'Buscar por tipo', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Id:', input: 'Buscar por id', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Origen:', input: 'Buscar por origen', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Destino:', input: 'Buscar por destino', type: 'text', dateStar:'',dateFinish:'',},
    { tex: 'Fecha salida:', input: '', type: '', dateStar:'Fecha salida',dateFinish:'',},
    { tex: 'Fecha llegada:', input: '', type: '', dateStar:'',dateFinish:'Fecha llegada',},
  ]

  @Input()  buttons = [
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa',configModal:{addService:null} },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal:{addService:AddTransportComponent} },
  ];

  @Input()  selects = [
    {
      text: 'Estado:',
      option: '',
      options: [
        { value: 'Todos', label: 'Todos' },
        { value: 'Inactivo', label: 'Inactivo' },
        { value: 'Activo', label: 'Activo' },
      ]
    },
  ];

  @Input()  titlesTransporte = [
    { title: 'Tipo' },
    { title: 'Origen' },
    { title: 'Destino' },
    { title: 'ID' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];
  @Input() itemsTransport: any[] = []

  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: TransportUpdateComponent,
    viewComponent: TransportVewComponent
  }

  @Input() modalConfigAdd: { addService: any; } = {
    addService: null,
  };

  ngOnInit() {
    this.transportUpload.loadComponent$.subscribe(() => {
      this.loadTransport(); // Método que recarga los datos de la tabla
    });
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
    this.loadTransport()
  }

loadTransport():void{
  this.itemsTransport = [];
  this.isLoading = true
  this.apiService.getAllTransport().subscribe(
    (response: any) => {      
      this.isLoading = false;
      this.itemsTransport = response.map((transport: any) => ({
        tipe: transport.transporttype || 'Sin tipo',
        name: transport.origin || 'Sin Origen',
        location: transport.destination || 'Ubicación no especificada',
        id: transport.transportid ? transport.transportid.toString() : 'ID no disponible',
        isToggled: transport.state !== undefined ? transport.state : false
      }));
    },
    (error) => {
      console.error('Error al cargar los transportes:', error);
    }
  )
}

onButtonClick(index: number, button: any): void {
    if (index === 0) {
      this.searchTranspor();
    } else if (index === 1) {
      console.log('Abriendo modal de agregar');
      this.modalConfigAdd.addService = button.configModal.addService;
      this.openModalAdd(button.configModal.addService);
    } else {
      console.log(`Botón ${index + 1} clicado`);
    }
}

searchTranspor(): void {
  const state = this.selectedState === 'Activo' ? true : (this.selectedState === 'Inactivo' ? false : undefined);
  
  const filters = {
    transportType: this.inputValues[0].value|| '',
    transportID: this.inputValues[1].value || '',
    origin: this.inputValues[2].value || '',
    destination: this.inputValues[3].value || '',
    departureDate: this.inputValues[4].dateStart || '',
    arrivalDate: this.inputValues[5].dateFinish || '',
    state: state !== undefined ? state : '',
  };
    this.itemsTransport = [];
    this.isLoading = true;
  this.apiService.filterTransport(filters).subscribe(
    (response: any) => {
      this.isLoading = false;
      this.isLoading
      if (Array.isArray(response)) {
        console.log('response transport:',response);
        this.itemsTransport = response.map((transport: any) => ({
          tipe: transport.transporttype || 'Sin tipo',
          name: transport.origin || 'Sin nombre',
          location: transport.destination || 'Ubicación no especificada',
          id: transport.transportid ? transport.transportid.toString() : 'ID no disponible',
          isToggled: transport.state !== undefined ? transport.state : false
        }));
      } else {
        console.warn('Respuesta no es un array:', response);
        this.itemsTransport = [];
      }
    },
    (error) => {
      this.isLoading = false;
      console.error('Error al buscar hoteles:', error);
    }
  );
}

openModalAdd(item: any): void {
    if (this.modalConfigAdd.addService) {
      this.modalService.openModal(this.modalConfigAdd.addService, 'addService', { item });
    } else {
      console.error('El componente addService es null o no está definido.');
    }
  }

  selectedState: string = 'Todos'; 

  onOptionChange(newValue: string) {
    this.selectedState = newValue
    this.searchTranspor();
  }
}
