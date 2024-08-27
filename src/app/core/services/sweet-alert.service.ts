import { Injectable, Input } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  @Input() colorButtonAcep = 'rgb(57 233 57)';
  @Input() colorButtonCancel = 'rgb(246 43 43)';

  showSuccess(message: string, imageUrl: string = ''): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      imageUrl: imageUrl,
      imageAlt: '',
      title: message,
      customClass: {
        popup: 'showSuccess'
      },
    });
  }  

  showError(message: string, title: string = 'Oops...'): void {
    Swal.fire({
      title: title,
      text: message,
      imageUrl: 'assets/icons/error.gif',
      imageAlt: '',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'showError',
        confirmButton: 'custom-confirm-button',
      },
    });
  }

  showWarning(message: string, title: string = 'Advertencia'): void {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'showSuccess',
      },
    });
  }

  showConfirmation(message: string, title: string = '', textConfir: string ='', cancelText: string = ''): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      imageUrl: 'assets/icons/alert.gif',
      imageAlt: '',
      showCancelButton: true,
      confirmButtonText: textConfir ? textConfir : 'Sí, activar',
      cancelButtonText: cancelText ? cancelText :'No activar',
      customClass: {
        popup: 'showConfirmation',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button'
      }
    });
  }


  showLoading(message: string, title: string = '', imageUrl: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      imageUrl: imageUrl,
      imageAlt: '',
      showConfirmButton: false,  // Oculta el botón de confirmación
      showCancelButton: false,   // Oculta el botón de cancelación
      customClass: {
        popup: 'showLoading'
      },
    });
  }
}  
