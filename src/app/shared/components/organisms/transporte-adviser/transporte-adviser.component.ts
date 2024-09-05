import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { ModalUpdateHotelComponent } from '../../../../features/home-admin/components/modal-update-hotel/modal-update-hotel.component';
import { ApiService } from '../../../../core/services/api.service';
import { Observable } from 'rxjs';
import { AddTransportComponent } from '../../../../features/home-admin/components/add-transport/add-transport.component';

@Component({
  selector: 'app-transporte-adviser',
  templateUrl: './transporte-adviser.component.html',
  styleUrls: ['./transporte-adviser.component.scss']
})
export class TransporteAdviserComponent {

  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
  ) {}

  @Input() titlesTopTransport= [    {title1:'Servicios', title2: 'Gestión de transportes'}  ];
  @Input() styleHeader: 'header' | 'headerTransporte' = 'header';
  @Input() butons: 'butons1' | 'butons2' = 'butons1';
  @Input() conten: 'conten' | 'conten2' = 'conten';

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
  @Input() itemsTransport = [
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false},
    { tipe:'Vuelo',name: 'Armenia, Quindio', location: 'Bogota, Cundinamarca', id: '1069642307', isToggled: false },
  ]

  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: null,
    viewComponent: null
  }

  @Input() modalConfigAdd: { addService: any; } = {
    addService: null,
  };

  ngOnInit() {
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
    this.loadTransport()
  }

loadTransport():void{
  this.apiService.getAllTransport().subscribe(
    (response: any) => {
      console.log('data',response);
      
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
    } else if (index === 1) {
      console.log('Abriendo modal de agregar');
      this.modalConfigAdd.addService = button.configModal.addService;
      this.openModalAdd(button.configModal.addService);
    } else {
      console.log(`Botón ${index + 1} clicado`);
    }
}

openModalAdd(item: any): void {
    if (this.modalConfigAdd.addService) {
      this.modalService.openModal(this.modalConfigAdd.addService, 'addService', { item });
    } else {
      console.error('El componente addService es null o no está definido.');
    }
  }
  onOptionChange(newValue: string) {
    console.log('Selected value:', newValue);
  }
}
