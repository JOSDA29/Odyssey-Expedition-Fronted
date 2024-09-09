import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vew-proveedores',
  templateUrl: './vew-proveedores.component.html',
  styleUrl: './vew-proveedores.component.scss'
})
export class VewProveedoresComponent implements OnInit {
  proveedorForm!: FormGroup;
  horarioAtencion: string = '';
  cargado: boolean = false;
  isReadOnly = true;

  @Input() inputs = [
    { placeholder: 'Ingrese identificación/NIT', type: 'text', formControlName: 'supplierID', text: 'Identificación/NIT:',isReadOnly:true },
    { placeholder: 'Ingrese compañía', type: 'text', formControlName: 'companyName', text: 'Compañía:',isReadOnly:true },
    { placeholder: 'Ingrese email', type: 'text', formControlName: 'email', text: 'Email:', isReadOnly:true },
    { placeholder: 'Ingrese teléfono', type: 'text', formControlName: 'phoneNumber', text: 'Teléfono:', isReadOnly:true },
    { placeholder: 'Ingrese dirección', type: 'text', formControlName: 'address', text: 'Dirección:', isReadOnly:true }
  ];
  

  constructor(
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<VewProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
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
          });
         this.horarioAtencion=proveedor.schedule
  
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

  closeVist(): void {
    this.dialogRef.close();
  }
}
