import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class AddProveedorComponent implements OnInit {
  proveedorForm!: FormGroup;
  horarioAtencion: string = ''; 
  @Input() inputs = [
    { placeholder: 'Ingrese identificación/NIT', type: 'text', formControlName: 'supplierID', text: 'Identificación/NIT:' },
    { placeholder: 'Ingrese compañía', type: 'text', formControlName: 'companyName', text: 'Compañía:' },
    { placeholder: 'Ingrese email', type: 'text', formControlName: 'email', text: 'Email:' },
    { placeholder: 'Ingrese teléfono', type: 'text', formControlName: 'phoneNumber', text: 'Teléfono:' },
    { placeholder: 'Ingrese dirección', type: 'text', formControlName: 'address', text: 'Dirección:' }
  ];
  

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<AddProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private proveedorUpdateService: loadComponent
  ) {}

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      supplierID: ['', [Validators.required, Validators.minLength(5)]],
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9\s,.!?-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      horarioAtencion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });
  }

  getFormControl(controlName: string): FormControl {
    const control = this.proveedorForm.get(controlName);
    if (!control) {
      throw new Error(`Control with name '${controlName}' not found in the form`);
    }
    return control as FormControl;
  }  


  getInputValues(): RegisterProveedor {
    const { supplierID, companyName, email, phoneNumber, address, horarioAtencion } = this.proveedorForm.value;
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
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }

    const payload = this.getInputValues();

    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de agregar este proveedor?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Creando proveedor...', '', 'assets/icons/loadingData.gif');
        this.apiService.registerProveedor(payload).subscribe(
          response => {
            this.sweetAlertService.hideLoading();
            this.proveedorUpdateService.notifyHotelUpdated();
            this.dialogRef.close(response);
            this.sweetAlertService.showSuccess('Creación exitosa', 'assets/icons/check.gif');
          },
          error => {
            this.sweetAlertService.hideLoading();
            this.sweetAlertService.showError('Error al crear el proveedor');
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

  getErrorMessage(controlName: string): string {
    const control = this.proveedorForm.get(controlName);
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'Campo obligatorio';
      }
      if (control.hasError('minlength')) {
        return `Debe tener al menos ${control.errors['minlength']?.requiredLength} caracteres`;
      }
      if (control.hasError('maxlength')) {
        return `No puede tener más de ${control.errors['maxlength']?.requiredLength} caracteres`;
      }
      if (control.hasError('pattern')) {
        return 'Formato inválido';
      }
      if (control.hasError('email')) {
        return 'Email inválido';
      }
    }
    return '';
  }
  

  isControlInvalid(controlName: string): boolean {
    const control = this.proveedorForm.get(controlName);
    return control?.touched && control?.invalid || false;
  }
}
