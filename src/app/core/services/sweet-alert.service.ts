import { Injectable, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  @Input() colorButtonAcep = 'rgb(57 233 57)'
  @Input() colorButtonCancel = 'rgb(246 43 43)'

  showSuccess(message: string, title: string = '¡Éxito!'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      iconColor: '#00e600',
      confirmButtonText: 'Aceptar',
      color: 'black',
      confirmButtonColor: this.colorButtonAcep,
    });
  }
  

  showError(message: string, title: string = 'Oops...'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: this.colorButtonAcep,
    });
  }

  showWarning(message: string, title: string = 'Advertencia'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'hsl(171, 100%, 41%)',
    });
  }

  showConfirmation(message: string, title: string = ''): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText:'Sí, activar',
      cancelButtonText: 'No activar',
      confirmButtonColor: this.colorButtonAcep,
      cancelButtonColor:this.colorButtonCancel,
    });
  }
}
