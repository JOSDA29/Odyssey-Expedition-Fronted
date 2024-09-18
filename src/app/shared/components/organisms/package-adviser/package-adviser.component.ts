import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { loadComponent } from '../../../../core/services/hotel-update-service.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { updatePaquete } from '../../../../core/models/paquetes/updatePaquetes';
import { AddPaquetesComponent } from '../../../../features/home-admin/components/paquetes/add-paquetes/add-paquetes.component';
import { EditPaqueteComponent } from '../../../../features/home-admin/components/paquetes/edit-paquete/edit-paquete.component';
import { ViewPaqueteComponent } from '../../../../features/home-admin/components/paquetes/view-paquete/view-paquete.component';

@Component({
  selector: 'app-package-adviser',
  templateUrl: './package-adviser.component.html',
  styleUrl: './package-adviser.component.scss'
})
export class PackageAdviserComponent {
  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
    private paquetestUpload: loadComponent,
  ) {}

  @Input() titlesTopPaquetes= [    {title1:'Servicios', title2: 'Gestión de paquetes'}  ];
  @Input() butons: 'butons1' | 'butons2' = 'butons1';
  @Input() conten: 'conten' | 'conten2' = 'conten';
  @Input() isLoading: boolean = false; // estado de carga

  inputValues: any[] = [];

  @Input() inputs = [
    { tex: 'Id:', input: 'Buscar por id', type: 'text', dateStar:'',dateFinish:'',list:false},
    { tex: 'Origen:', input: 'Buscar por origen', type: 'text', dateStar:'',dateFinish:'',list:true},
    { tex: 'Destino:', input: 'Buscar por destino', type: 'text', dateStar:'',dateFinish:'',list:true},
    { tex: 'Fecha salida:', input: '', type: '', dateStar:'Fecha salida',dateFinish:'',list:false},
    { tex: 'Fecha llegada:', input: '', type: '', dateStar:'',dateFinish:'Fecha llegada',list:false},
  ]

  @Input()  buttons = [
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa',configModal:{addService:null} },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal:{addService:AddPaquetesComponent} },
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

  @Input()  titlesPaquete = [
    { title: 'ID' },
    { title: 'Origen' },
    { title: 'Destino' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];
  @Input() itemsPaquete: any[] = []

  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: EditPaqueteComponent,
    viewComponent: ViewPaqueteComponent
  }

  @Input() modalConfigAdd: { addService: any; } = {
    addService: null,
  };

  ngOnInit() {
    this.paquetestUpload.loadComponent$.subscribe(() => {
      this.loadPaquete(); // Método que recarga los datos de la tabla
    });
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
    this.loadPaquete()
  }

  loadPaquete(): void {
    this.itemsPaquete = [];
    this.isLoading = true;
    const filter: updatePaquete = {}; 
    this.apiService.filterPaquetes(filter).subscribe(
      (response: any) => {     
        this.isLoading = false;
          console.log('Respuesta del backend:', response);
          this.itemsPaquete = response.map((paquete: any) => ({
          name: paquete.packageid ? String(paquete.packageid) : 'Id no encontrado',
          location: paquete.origin || 'Ubicación no especificada',
          id: paquete.destination || 'Destino no encontrado',
          isToggled: paquete.state !== undefined ? paquete.state : false
        }));  
      },
      (error) => {
        this.isLoading = false;
        this.itemsPaquete = [];
        console.error('Error al cargar los paquetes:', error);
      }
    );
  }
  

onButtonClick(index: number, button: any): void {
    if (index === 0) {
      this.searchPaquetes();
    } else if (index === 1) {
      this.modalConfigAdd.addService = button.configModal.addService;
      this.openModalAdd(button.configModal.addService);
    } else {
      console.log(`Botón ${index + 1} clicado`);
    }
}

searchPaquetes(): void {
  const state = this.selectedState === 'Activo' ? true : (this.selectedState === 'Inactivo' ? false : undefined);
  
  const filters = {
    id: this.inputValues[0].value|| '',
    origin: this.inputValues[1].value || '',
    destination: this.inputValues[2].value || '',
    departureDate: this.inputValues[3].dateStart || '',
    returnDate: this.inputValues[4].dateFinish || '',
    state: state !== undefined ? state : '',
  };
  console.log('Filtros enviados1 :', filters);
    this.itemsPaquete = [];
    this.isLoading = true;
  this.apiService.filterPaquetes(filters).subscribe(
    (response: any) => {
      this.isLoading = false;
      this.isLoading
      if (Array.isArray(response)) {
        console.log('response paquete:',response);
        this.itemsPaquete = response.map((paquete: any) => ({
          name: paquete.packageid ? String(paquete.packageid) : 'Id no encontrado',
          location: paquete.origin || 'Ubicación no especificada',
          id: paquete.destination || 'Destino no encontrado',
          isToggled: paquete.state !== undefined ? paquete.state : false
        }));
      } else {
        this.isLoading = false;
        this.itemsPaquete = [];
        console.warn('Respuesta no es un array:', response);
      }
    },
    (error) => {
      this.isLoading = false;
      this.itemsPaquete = [];
      console.error('Error al buscar paquetes:', error);
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
    this.searchPaquetes();
  }
}
