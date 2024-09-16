import { Component, Input } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';
import { updateHotel } from '../../../../core/models/hotel/updateHotel';
import { ApiService } from '../../../../core/services/api.service';
import { updateTransport } from '../../../../core/models/transport/updateTransport';
import { UpdateProveedor } from '../../../../core/models/proveedor/proveedorUpdate';
import { updatePaquete } from '../../../../core/models/paquetes/updatePaquetes';
import { ViewDataHotelComponent } from '../../../../features/home-admin/components/hotel-funtions/view-data-hotel/view-data-hotel.component';
import { TransportVewComponent } from '../../../../features/home-admin/components/transport-funtion/transport-vew/transport-vew.component';

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

  @Input() truncateNumber: number = 15;
  @Input() truncaIdteNumber: number = 10;
  @Input() styleContainer: 'contenTable' | 'contenTableAddPaquete' = 'contenTable';
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
    isToggled?: boolean;
  }[] = [];

  onToggleChange(newValue: boolean, item: any): void {
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de que quieres cambiar el estado a ${newValue ? 'activo' : 'inactivo'}?`,
      'Confirmación', 'Aceptar', 'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        console.log(`Estado actualizado desde: ${this.sourceComponent}`);
        if (this.sourceComponent === 'ComponenteHotel') {
          const updatedHotel: updateHotel = {
            id: String(item.id),
            state: newValue
          };
          this.apiService.updateHotel(updatedHotel).subscribe(
            () => {},
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );
        } else if (this.sourceComponent === 'ComponenteTransporte') {
          const updateTransport: updateTransport = {
            transportID: String(item.id),
            state: newValue,
          };
          this.apiService.updateTransport(updateTransport).subscribe(
            () => {},
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );
        } else if (this.sourceComponent === 'ComponenteProveedor') {
          const updateProveedor: UpdateProveedor = {
            email: String(item.id),
            state: newValue,
          };
          this.apiService.updateChangeState(updateProveedor).subscribe(
            () => {},
            (error) => {
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );

        } else if (this.sourceComponent === 'ComponentePaquete') {
          const updatePaquete: updatePaquete = {
            id: Number(item.name),
            state: newValue,
          };
          console.log('Respuesta del backend tabla:', item);
          console.log(`Id paquete: ${item.name}`);
          
          this.apiService.updatePaquetes(updatePaquete).subscribe(
            () => {},
            (error) => {
              console.log(`Id paquete: ${item.name}`);
              console.error('Error al actualizar el estado:', error);
              this.sweetAlertService.showError('Error al actualizar el estado.');
            }
          );
        }
      } else {
        item.isToggled = !newValue;
      }
    });
  }  

  asignateView(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const filtersHotel = { id: Number(item.id) };
      const filtersTransport = { transportID: String(item.id) };
  
      console.log('ID de hotel a consultar:', filtersHotel.id);
      console.log('ID de transporte a consultar:', filtersTransport.transportID);
  
      // Verificar si el ID del hotel es NaN
      if (isNaN(filtersHotel.id)) {
        console.warn('ID de hotel no válido, intentando transportes...');
        this.apiService.filterTransport(filtersTransport).subscribe(
          (response: any) => {
            if (Array.isArray(response) && response.length > 0) {
              console.log('Respuesta de transportes:', response);
              this.modalConfig.viewComponent = TransportVewComponent;
              resolve();
            } else {
              console.warn('No se encontraron transportes válidos.');
              reject('No se encontraron datos válidos en la consulta de transportes.');
            }
          },
          (error) => {
            console.error('Error al buscar transportes:', error);
            reject('Error al buscar transportes.');
          }
        );
      } else {
        // Realizar consulta de hoteles
        this.apiService.filterHotels(filtersHotel).subscribe(
          (response: any) => {
            if (Array.isArray(response) && response.length > 0) {
              console.log('Respuesta de hoteles:', response);
              this.modalConfig.viewComponent = ViewDataHotelComponent;
              resolve();
            } else {
              console.warn('No se encontraron hoteles, intentando transportes...');
      
              // Realizar consulta de transportes si no se encontraron hoteles
              this.apiService.filterTransport(filtersTransport).subscribe(
                (response: any) => {
                  if (Array.isArray(response) && response.length > 0) {
                    console.log('Respuesta de transportes:', response);
                    this.modalConfig.viewComponent = TransportVewComponent;
                    resolve();
                  } else {
                    console.warn('No se encontraron transportes válidos.');
                    reject('No se encontraron datos válidos en la consulta de transportes.');
                  }
                },
                (error) => {
                  console.error('Error al buscar transportes:', error);
                  reject('Error al buscar transportes.');
                }
              );
            }
          },
          (error) => {
            console.error('Error al buscar hoteles:', error);
            reject('Error al buscar hoteles.');
          }
        );
      }
    });
  }
  
  
  // Nueva configuración de modales
  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: null,
    viewComponent: null
  };

  openModalView(item: any): void {
    if (this.sourceComponent === 'ComponentePaquete') {
      this.asignateView(item)
        .then(() => {
          // Verificar si viewComponent está definido
          if (!this.modalConfig?.viewComponent) {
            this.sweetAlertService.showError('El componente de visualización no está definido.');
            return;
          }
    
          // Proceder con la apertura del modal si el componente es válido
          this.modalService.openModal(this.modalConfig.viewComponent, 'viewModal', { item });
        })
        .catch((error) => {
          this.sweetAlertService.showError('No se pudo abrir la visualización. ' + error);
        });
    } else {
      // Si sourceComponent no es 'ComponentePaquete', abrir el modal directamente
      if (this.modalConfig?.viewComponent) {
        this.modalService.openModal(this.modalConfig.viewComponent, 'viewModal', { item });
      } else {
        this.sweetAlertService.showError('El componente de visualización no está definido.');
      }
    }
  }

  openModalEdit(item: any): void {
    this.modalService.openModal(this.modalConfig?.editComponent, 'editModal', { item });
  }

  removed(item: any): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}
