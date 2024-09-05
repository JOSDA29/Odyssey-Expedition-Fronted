import { Component, Input } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { updateHotel } from '../../../../core/models/updateHotel';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss']
})
export class TableAdminComponent {
  constructor(
    private modalService: ModalService,
    private sweetAlertService: SweetAlertService,
    private apiService: ApiService,
  ) {}

  @Input() titleTable: string = '';
  @Input() header: 'header' | 'headerTransporte' = 'header';
  @Input() conten: 'conten' | 'conten2' = 'conten';
  @Input() sourceComponent: string = ''; // Nuevo Input para el origen del cambio

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
        if (this.sourceComponent == 'ComponenteHotel') {
          const updatedHotel: updateHotel = {
            id: Number(item.id),
            state: newValue
          };
          this.apiService.updateHotel(updatedHotel).subscribe(
            () => {
              console.log(`Estado actualizado desde: ${this.sourceComponent}`);
              // Puedes realizar otras acciones según el origen
            },
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );
        }else{
        }
      } else {
        item.isToggled = !newValue;
      }
    });
  }  
  
  // Nueva configuración de modales
  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: null,
    viewComponent: null
  };

  openModalEdit(item: any): void {
    this.modalService.openModal(this.modalConfig?.editComponent, 'editModal', { item });
  }
  
  openModalView(item: any): void {
    const id = item.id;
  
    // Validar que el ID no esté vacío, nulo o indefinido
    if (!id) {
      this.sweetAlertService.showError('El ID del hotel no es válido. No se puede abrir la visualización.');
      return; // Detener la ejecución si el ID no es válido
    }
    // Proceder con la apertura del modal si el ID es válido
    this.modalService.openModal(this.modalConfig?.viewComponent, 'viewModal', { item });
  }
  
}
