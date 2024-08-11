import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccess(message: string, title: string = '¡Éxito!'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'hsl(171, 100%, 41%)',
    });
  }

  showError(message: string, title: string = 'Oops...'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'hsl(171, 100%, 41%)',
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

  showConfirmation(message: string, title: string = '¿Estás seguro?'): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: 'hsl(171, 100%, 41%)',
    });
  }
}
