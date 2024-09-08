import { Component, Inject, Input } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { RegisterProveedor } from '../../../../../core/models/proveedor/proveedor';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.scss']
})
export class AddProveedorComponent {
  @Input() inputs = [
    { placeholder: 'Ingrese identificación/NIT', type: 'text', text: 'Identificación/NIT:' },
    { placeholder: 'Ingrese compañía', type: 'text', text: 'Compañía:' },
    { placeholder: 'Ingrese email', type: 'text', text: 'Email:' },
    { placeholder: 'Ingrese teléfono', type: 'text', text: 'Teléfono:' },
    { placeholder: 'Ingrese dirección', type: 'text', text: 'Dirección:' }
  ];

  inputValues: any[] = [];
  errorMessages: string[] = [];
  horarioAtencion: string = '';

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private proveedorUpdateService: loadComponent
  ) {
    this.inputValues = this.inputs.map(() => ({ value: '' }));
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getInputValues(): RegisterProveedor {
    const supplierID = this.inputValues[0]?.value || '';
    const companyName = this.inputValues[1]?.value || '';
    const email = this.inputValues[2]?.value || '';
    const phoneNumber = this.inputValues[3]?.value || '';
    const address = this.inputValues[4]?.value || '';

    this.errorMessages = [];

    if (!supplierID) {
      this.errorMessages[0] = 'Campo obligatorio';
    } else if (supplierID.length < 5) {
      this.errorMessages[0] = 'El ID del proveedor debe tener mínimo 5 caracteres';
    }

    if (!companyName) {
      this.errorMessages[1] = 'Campo obligatorio';
    } else if (companyName.length < 3) {
      this.errorMessages[1] = 'El nombre de la empresa debe contener mínimo 3 caracteres';
    } else if (!/^[a-zA-Z0-9\s,.!?-]+$/.test(companyName)) {
      this.errorMessages[1] = 'El nombre de la empresa solo puede contener letras, números, espacios y ciertos caracteres de puntuación';
    }

    if (!email) {
      this.errorMessages[2] = 'Campo obligatorio';
    } else if (!this.isValidEmail(email)) {
      this.errorMessages[2] = 'Se debe ingresar un email válido';
    }

    if (!phoneNumber) {
      this.errorMessages[3] = 'Campo obligatorio';
    } else if (phoneNumber.length !== 10) {
      this.errorMessages[3] = 'El teléfono debe contener 10 dígitos';
    } else if (!/^\d+$/.test(phoneNumber)) {
      this.errorMessages[3] = 'El teléfono debe contener solo números';
    }

    if (!address) {
      this.errorMessages[4] = 'Campo obligatorio';
    }

    if (!this.horarioAtencion) {
      this.errorMessages[5] = 'Campo obligatorio';
    } else if (this.horarioAtencion.length < 10 || this.horarioAtencion.length > 250) {
      this.errorMessages[5] = 'Caracteres mínimos 10 y máximo 250';
    }

    if (this.errorMessages.some(error => error)) {
      throw new Error('Datos inválidos');
    }

    return {
      supplierID,
      companyName,
      email,
      phoneNumber,
      schedule: this.horarioAtencion || '',
      address,
      state: true
    };
  }

  saveData(): void {
    let payload;
    try {
      payload = this.getInputValues();
    } catch (error) {
      console.error('Error en los datos:', this.errorMessages);
      this.sweetAlertService.showError('Errores en los datos: ' + this.errorMessages.join(', '));
      return;
    }

    console.log('Datos a enviar:', payload);

    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de agregar este proveedor?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Por favor espera.', 'Creando proveedor...', 'assets/icons/avionLoading.gif');
        this.apiService.registerProveedor(payload).subscribe(
          response => {
            console.log('Proveedor agregado exitosamente:', response);
            this.proveedorUpdateService.notifyHotelUpdated();
            this.dialogRef.close(response);
          },
          error => {
            console.error('Error al agregar el proveedor:', error);
            if (error.error && error.error.errors) {
              const backendErrors = error.error.errors.reduce((acc: any, err: any) => {
                if (err.path === 'email') {
                  acc[2] = err.msg;
                } else if (err.path === 'companyName') {
                  acc[1] = err.msg;
                } else if (err.path === 'supplierID') {
                  acc[0] = err.msg;
                } else if (err.path === 'phoneNumber') {
                  acc[3] = err.msg;
                }
                return acc;
              }, [...this.errorMessages]);

              this.errorMessages = backendErrors;
              this.sweetAlertService.showError('Errores en los datos: ' + this.errorMessages.join(', '));
            } else {
              this.sweetAlertService.showError('Error al agregar el proveedor');
            }
          }
        );
      }
    });
  }

  cancelData(): void {
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de cancelar?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }
}
