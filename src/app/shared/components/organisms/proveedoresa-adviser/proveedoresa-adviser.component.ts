import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { loadComponent } from '../../../../core/services/hotel-update-service.service';
import { AddProveedorComponent } from '../../../../features/home-admin/components/proveedor/add-proveedor/add-proveedor.component';
import { ModalUpdateProveedorComponent } from '../../../../features/home-admin/components/proveedor/modal-update-proveedor/modal-update-proveedor.component';
import { VewProveedoresComponent } from '../../../../features/home-admin/components/proveedor/vew-proveedores/vew-proveedores.component';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';

@Component({
  selector: 'app-proveedoresa-adviser',
  templateUrl: './proveedoresa-adviser.component.html',
  styleUrl: './proveedoresa-adviser.component.scss'
})
export class ProveedoresaAdviserComponent implements OnInit {
  @Input() titlesTopHotel = [ { title1: 'Servicios', title2: 'Gestión de proveedores' } ];
  @Input() isLoading: boolean = false;

  @Input() selects = [
    { text: 'Estado:', option: '', options: [
      { value: 'Todos', label: 'Todos' },
      { value: 'Inactivo', label: 'Inactivo' },
      { value: 'Activo', label: 'Activo' },
    ] }
  ];

  @Input() titlesTransporte = [
    { title: 'Compañia' },
    { title: 'Identification/NIT' },
    { title: 'Correo' },
    { title: 'Estado' },
    { title: 'Acciones' }
  ];

  @Input() inputs = [
    { tex: 'Compañia:', input: 'Buscar por compañia', type: 'text' },
    { tex: 'ID/NIT:', input: 'Buscar por ID/NIT', type: 'text' },
    { tex: 'Correo:', input: 'Buscar por correo', type: 'text' },
  ];
  @Input() buttons = [
    { textButon: 'Buscar', srcButon: 'assets/icons/lupa.png', altButon: 'lupa', configModal: { addService: null } },
    { textButon: 'Agregar', srcButon: 'assets/icons/mas.png', altButon: 'mas', configModal: { addService: AddProveedorComponent } },
  ];
  @Input() itemsProveedor: any[] = [];
  
  inputValues: any[] = [];

  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: ModalUpdateProveedorComponent,
    viewComponent: VewProveedoresComponent
  };

  @Input() modalConfigAdd: { addService: any; } = {
    addService: AddProveedorComponent,
  };

  constructor(
    private apiService: ApiService,
    private modalService: ModalService,
    private proveedorUpdateService: loadComponent
  ) {
    this.inputValues = this.inputs.map(() => ({ value: '' }));
  }

  ngOnInit() {
    this.proveedorUpdateService.loadComponent$.subscribe(() => {
      this.loadProveedor(); // Método que recarga los datos de la tabla
    });

    this.loadProveedor(); // Cargar los hoteles al iniciar el componente
  }

  loadProveedor(): void {
    const state = this.selectedState === 'Activo' ? true : (this.selectedState === 'Inactivo' ? false : undefined);
    const filters = {
      companyName: this.inputValues[0].value || '',
      supplierID: this.inputValues[1].value || '',
      email: this.inputValues[2].value || '',
      state: state !== undefined ? state : ''
    };
    this.itemsProveedor = []
    this.isLoading = true;
    this.apiService.filterProveedores(filters).subscribe(
      (response: any) => {
        this.isLoading = false;        
        this.itemsProveedor = response.map((proveedor: any) => ({
          name: proveedor.company_name || 'Sin nombre',
          location: proveedor.supplier_id || 'Ubicación no especificada',
          id: proveedor.email ? proveedor.email : 'Email no disponible',
          isToggled: proveedor.state !== undefined ? proveedor.state : false
        }));
      },
      (error) => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }


  
  onButtonClick(index: number, button: any): void {
    if (index === 0) {
      this.loadProveedor();
    } else if (index === 1) {
      this.openModalAdd(button);
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

  selectedState: string = 'Todos'; // Valor por defecto

  onOptionChange(newValue: string) {
    this.selectedState = newValue;
    this.loadProveedor(); // Llama a searchHotels cada vez que cambie el estado
  }
  
}
