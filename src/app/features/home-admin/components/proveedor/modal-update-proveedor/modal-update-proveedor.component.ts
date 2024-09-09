import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';
import { UpdateProveedor } from '../../../../../core/models/proveedor/proveedorUpdate';

@Component({
  selector: 'app-modal-update-proveedor',
  templateUrl: './modal-update-proveedor.component.html',
  styleUrl: './modal-update-proveedor.component.scss'
})
export class ModalUpdateProveedorComponent implements OnInit {
  proveedorForm!: FormGroup;
  horarioAtencion: string = '';
  cargado: boolean = false;

  @Input() inputs = [
    { placeholder: 'Ingrese identificación/NIT', type: 'text', formControlName: 'supplierID', text: 'Identificación/NIT:',isReadOnly:true },
    { placeholder: 'Ingrese compañía', type: 'text', formControlName: 'companyName', text: 'Compañía:',isReadOnly:true },
    { placeholder: 'Ingrese email', type: 'text', formControlName: 'email', text: 'Email:', isReadOnly:false },
    { placeholder: 'Ingrese teléfono', type: 'text', formControlName: 'phoneNumber', text: 'Teléfono:', isReadOnly:false },
    { placeholder: 'Ingrese dirección', type: 'text', formControlName: 'address', text: 'Dirección:', isReadOnly:false }
  ];
  

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<ModalUpdateProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private proveedorUpdateService: loadComponent,
    private cdr: ChangeDetectorRef,
  ) {}

   supplierID = this.data.item.location;
  ngOnInit(): void {
    if (this.supplierID) {
      this.sweetAlertService.showLoading('Cargando proveedor...','','assets/icons/loadingData.gif');
      this.loadProveedor(this.supplierID);
    }else{
      console.error('No ID proveedor');
    }
    this.cdr.detectChanges();
    
    this.proveedorForm = this.fb.group({
      supplierID: ['', [Validators.required, Validators.minLength(5)]],
      companyName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9\s,.!?-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      horarioAtencion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });
  }

  // En el archivo TypeScript
  getFormControl(controlName: string): FormControl {
    const control = this.proveedorForm.get(controlName);
    if (!control) {
      throw new Error(`Control with name '${controlName}' not found in the form`);
    }
    return control as FormControl;
  }  


  getInputValues(): UpdateProveedor {
    const { supplierID, email, address,horarioAtencion, phoneNumber } = this.proveedorForm.value;
    return {
      supplierID,
      email,
      phoneNumber,
      schedule: horarioAtencion ,
      address,
      state: true
    };
  }

  loadProveedor(supplierID: string): void {
    const filters = { supplierID };
    this.cargado = false;        
    this.apiService.filterProveedores(filters).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          const proveedor = response[0]; // Obtener el primer proveedor de la lista
  
          // Asignar los valores recibidos del backend al formulario
          this.proveedorForm?.patchValue({
            supplierID: proveedor.supplier_id || '',
            companyName: proveedor.company_name || '',
            email: proveedor.email || '',
            phoneNumber: proveedor.phone || '',
            address: proveedor.address || '',
            horarioAtencion: proveedor.schedule || ''
          });
  
          this.cargado = true;
          this.sweetAlertService.hideLoading();
        } else {
          console.log('No se encontraron proveedores.');
          this.sweetAlertService.hideLoading();
        }
      },
      (error) => {
        console.error('Error al cargar los proveedores:', error);
        this.sweetAlertService.hideLoading();
      }
    );
  }

  saveData(): void {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }

    const payload = this.getInputValues();

    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de actualizar este proveedor?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Actualizando proveedor...', '', 'assets/icons/loadingData.gif');
        this.apiService.updateProveedor(payload).subscribe(
          response => {
            this.sweetAlertService.hideLoading();
            this.proveedorUpdateService.notifyHotelUpdated();
            this.dialogRef.close(response);
            this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
          },
          error => {
            this.sweetAlertService.hideLoading();
            this.sweetAlertService.showError('Error al actualizar el proveedor');
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
