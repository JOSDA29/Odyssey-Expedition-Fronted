import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/error-handling.service';
import { SweetAlertService } from '../services/sweet-alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private sweetAlertService: SweetAlertService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.status === 0) {
          // Check for connection refused errors
          if (error.error instanceof ErrorEvent) {
            errorMessage = 'Revisa tu conexion a internet.';
          } else {
            errorMessage = 'Revisa tu conexion a internet o intentalo más tarde.';
            this.sweetAlertService.showError(
              `${errorMessage}`,`Error de conexión:`
            );
          }
        } else {
          // Use ErrorHandlingService for other HTTP errors
          errorMessage = this.errorHandlingService.handleError(error);
        }

        

        // Opcional: Log de error en la consola
        console.error('Error intercepted:', errorMessage);

        // Re-lanzar el error para que otros interceptores o componentes lo manejen si es necesario
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
