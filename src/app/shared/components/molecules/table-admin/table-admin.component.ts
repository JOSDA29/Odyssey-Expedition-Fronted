import { Component, Input } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { updateHotel } from '../../../../core/models/hotel/updateHotel';
import { ApiService } from '../../../../core/services/api.service';
import { updateTransport } from '../../../../core/models/transport/updateTransport';
import { UpdateProveedor } from '../../../../core/models/proveedor/proveedorUpdate';
import { updatePaquete } from '../../../../core/models/paquetes/updatePaquetes';

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
  @Input() isLoading: boolean = false; // estado de carga

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
        console.log(`Estado actualizado desde: ${this.sourceComponent}`);
        if (this.sourceComponent == 'ComponenteHotel') {
          const updatedHotel: updateHotel = {
            id: String(item.id),
            state: newValue
          };
          this.apiService.updateHotel(updatedHotel).subscribe(
            () => {
            },
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );
        }else if (this.sourceComponent == 'ComponenteTransporte'){
          const updateTransport: updateTransport = {
            transportID: String(item.id),
            state : newValue,
          };
          this.apiService.updateTransport(updateTransport).subscribe(
            () => {
            },
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );
        }else if (this.sourceComponent == 'ComponenteProveedor') {
          const updateProveedor: UpdateProveedor = {
            email: String(item.id),
            state: newValue,
          };
          this.apiService.updateChangeState(updateProveedor).subscribe(
            () => {
            },
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );

        }else if (this.sourceComponent == 'ComponentePaquete') {
          const updatePaquete: updatePaquete = {
            id: Number(item.name),
            state: newValue,
          }
          console.log('Respuesta del backend tabla:', item);
          console.log(`Id paquete: ${item.name}`);
          
          this.apiService.updatePaquetes(updatePaquete).subscribe(
            ()=>{

            },
            (error) =>{
              console.log(`Id paquete: ${item.name}`);
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          )
          
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
