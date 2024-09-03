import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalService } from '../../features/home/services/modal-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private modalOpened = false;

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error intercepted:', error); // Mensaje de depuración

        // Verifica el estado y el mensaje de error
        if (error.status === 403) {
          // Maneja los posibles formatos de error
          const errorBody = error.error;
          const errorMessage = (errorBody && (errorBody.error || errorBody.status)) || error.message;

          if (errorMessage === 'jwt expired' || errorMessage === 'Invalid Token' || errorBody.status === 'Invalid Token') {
            localStorage.clear(); // Limpia el almacenamiento local
            this.router.navigate(['/']).then(() => window.location.reload());
            if (!this.modalOpened) {
              this.modalService.openModal(); // Abre el modal de login
              this.modalOpened = true;
            }
            return throwError(error);
          }
        }

        return throwError(error);
      })
    );
  }
}
