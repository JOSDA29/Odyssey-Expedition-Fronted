import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { ApiService } from '../../../../core/services/api.service';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import { Router } from '@angular/router';
import { authGoogle } from '../../../../core/models/authGoogle/authGogle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any = null;
  showContent: boolean = true;

  constructor(
    private authGoogleService: AuthGoogleService,
    private apiService: ApiService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit() {
    // Comprobar el estado de inicio de sesión
    const storageValue = localStorage.getItem('isLoggedAdviser');
    if (storageValue === 'true') {
      this.showContent = false;
    }

    this.loadUserProfile();

    // Cargar el perfil del usuario si la página ya se recargó
    this.authGoogleService.getAuthState().subscribe(user => {
      if (user) {
        this.authGoogleService.getUserInfo().then(info => {
          if (info) {
            this.user = info;
            this.loadUserProfile(); // Cargar el perfil después de obtener la info del usuario
          } else {
            console.error('No se pudo obtener la información del usuario.');
          }
        });
      } else {
        console.error('Usuario no autenticado.');
      }
    });
  }

  async loadUserProfile() {
    if (!this.user) {
      console.error('No se ha cargado la información del usuario.');
      return;
    }
  
    try {
      const dataUser: authGoogle = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
      };
    
      // Enviar datos al backend
      this.apiService.authGoogle(dataUser).subscribe(
        (response) => {
          const AccessToken = response.token;
          localStorage.setItem('token', AccessToken);
          this.handleUserState();
        },
        (error) => {
          console.error('Error en la autenticación con Google:', error);
        }
      );
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
    }
  }
  

  handleUserState() {
    this.apiService.getUserInfo().subscribe((userInfo) => {
      if (userInfo.state !== true) {
        localStorage.setItem('isLoggedIn', 'false');
        sessionStorage.setItem('isLoggedIn', 'false');
        this.sweetAlertService
          .showConfirmation(
            'Tu cuenta está desactivada, ¿quieres activarla de nuevo?',
            'Cuenta inactiva'
          )
          .then((result) => {
            if (result.isConfirmed) {
              this.apiService.changeState(true).subscribe(
                (response) => {
                  localStorage.setItem('isLoggedIn', 'true');
                  sessionStorage.setItem('isLoggedIn', 'true');
                  this.router.navigate(['/clientProfile']);
                },
                (error) => {
                  console.error('Error al actualizar el estado del cliente:', error);
                }
              );
            } else {
              sessionStorage.clear();
              localStorage.clear();
            }
          });
      } else {
        localStorage.setItem('isLoggedIn', 'true');
        this.sweetAlertService.showSuccess('Inicio de sesión exitoso', 'assets/icons/check.gif');
      }
    });
  }
}
