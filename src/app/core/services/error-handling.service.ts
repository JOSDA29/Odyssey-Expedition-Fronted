import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  handleError(error: HttpErrorResponse): string {
    let errorMessage = '';

    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
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
            errorMessage = 'Correo electrónico ya registrado.'
            break;
        case 422:
          errorMessage = 'Verifica que el numero de telefono tenga 10 digitos y sean numeros';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Por favor intenta nuevamente más tarde.';
          break;
        default:
          errorMessage = `Error desconocido: ${error.message}`;
      }
    }

    return errorMessage;
  }
}
