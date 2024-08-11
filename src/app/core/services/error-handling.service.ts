import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private sweetAlertService: SweetAlertService,
  ) { }

  handleError(error: HttpErrorResponse): void {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Por favor verifica los datos enviados.';
          break;
        case 401:
          errorMessage = 'Correo o contraseña incorrectos';
          break;
        case 403:
          errorMessage = 'Acceso prohibido. No tienes permisos para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado. Por favor verifica la URL.';
          break;
        case 409:
          errorMessage = 'Correo electrónico ya registrado.';
          break;
        case 422:
          errorMessage = 'Verifica que el número de teléfono tenga 10 dígitos y sean números.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Por favor intenta nuevamente más tarde.';
          break;
        default:
          errorMessage = `Error desconocido: ${error.message}`;
      }
    }

    this.sweetAlertService.showError(errorMessage);

  }
}
