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

  intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
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
        if (error.status === 403) {
          this.router.navigate(['/']);
          localStorage.clear();
          if (!this.modalOpened) {
            this.modalService.openModal();
            this.modalOpened = true; 
          }
        }
        return throwError(error);
      })
    );
  }
}
