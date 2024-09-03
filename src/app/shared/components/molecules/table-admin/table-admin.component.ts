import { Component, Input } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss']
})
export class TableAdminComponent {
  constructor(
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService
  ) {}

  @Input() titleTable: string = '';
  @Input() header: 'header' | 'headerTransporte' = 'header';
  @Input() conten: 'conten' | 'conten2' = 'conten';

  @Input() titles: { title: string }[] = [];
  @Input() items: {
    tipe?: string; 
    name: string;
    location: string;
    id: string;
    isToggled: boolean;
  }[] = [];

  
  
  onToggleChange(newValue: boolean, item: any): void {
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de que quieres cambiar el estado a ${newValue ? 'activo' : 'inactivo'}?`,
      'Confirmación', 'Aceptar', 'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        item.isToggled = newValue;
      } else {
        item.isToggled = !newValue;
      }
    });
  }
  
  // Nueva configuración de modal
  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: null,
    viewComponent: null
  };
  openModalEdit(item: any): void {
    this.modalService.openModal(this.modalConfig?.editComponent, 'editModal', { item });
  }
  
  openModalView(item: any): void {
    this.modalService.openModal(this.modalConfig?.viewComponent, 'viewModal', { item });
  }
}
