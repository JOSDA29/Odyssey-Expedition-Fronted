import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-login.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service'; 
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() srclogo: string = '';
  @Input() altlogo: string = '';
  @Input() srcicon: string = '';
  @Input() alticon: string = '';
  @Input() links: { href: string, text: string }[] = [];
  @Input() text: string = '';
  @Input() state: boolean = true;
  @Input() showLinks: boolean = true;
  profileMenuOpen: boolean = false;

  selectedLinkIndex: number | null = null;
  menuOpen: boolean = false;
  userProfilePicture: string = 'assets/icons/profile.png';

  constructor(
    public modalService: ModalService,
    private authGoogleService: AuthGoogleService,
    private router: Router,
    private apiService: ApiService,
    private sweetAlertService: SweetAlertService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.selectDefaultLink();
    this.fetchUserProfile();
  }

  selectDefaultLink() {
    const savedIndex = localStorage.getItem('selectedLinkIndex');
    this.selectedLinkIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
  }

  selectLink(index: number) {
    this.selectedLinkIndex = index;
    localStorage.setItem('selectedLinkIndex', index.toString());
    this.menuOpen = false;
  }

  ayuda(){
    this.router.navigate(['/ayuda']);
    localStorage.setItem('selectedLinkIndex', '2')
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation(); // Detiene la propagación del evento de clic

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || this.authGoogleService.isAuthenticated();

    if (isLoggedIn) {
      // Si está logueado, alterna la visibilidad del menú del perfil
      this.profileMenuOpen = !this.profileMenuOpen;
    } else {
      // Si no está logueado, abre el modal de inicio de sesión
      this.modalService.openModal();
    }
  }

  openLoginModal(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isLoggedInGoogle = this.authGoogleService.isAuthenticated();
  
    if ((isLoggedIn === 'true' && this.state) || isLoggedInGoogle) {
      // Si está logueado, solo muestra el menú de perfil sin redirigir
      this.profileMenuOpen = true; // Aseguramos que el menú del perfil esté abierto
    } else {
      // Si no está logueado, mostramos el modal de inicio de sesión
      this.modalService.openModal();
    }
  
    // Si la cuenta está desactivada y no está logueado
    if (!this.state && isLoggedIn !== 'true') {
      this.sweetAlertService.showConfirmation(
        'Tu cuenta está desactivada, ¿quieres activarla de nuevo?',
        'Cuenta inactiva'
      ).then((result) => {
        if (result.isConfirmed) {
          this.apiService.changeState(true).subscribe(
            (response) => {
              this.state = true; // Actualizar el estado local
              this.profileMenuOpen = true; // Abrimos el menú del perfil ahora que la cuenta está activada
              // Mostrar mensaje de éxito después de activar la cuenta
              this.sweetAlertService.showSuccess('Reactivación de cuenta exitosa', 'assets/icons/check.gif');
            },
            (error) => {
              console.error('Error al actualizar el estado del cliente:', error);
            }
          );
        }else{
          this.sweetAlertService.showSuccess('Reactivación de cuenta exitosa', 'assets/icons/check.gif');
        }
      });
    }
  }
  

  fetchUserProfile(): void {
    this.apiService.getUserInfo().subscribe(userInfo => {
      // Manejar la imagen del perfil
      if (userInfo.imageurl !== null && userInfo.state !== false) {
        this.userProfilePicture = userInfo.imageurl; 
      }
      
      // Manejar el estado del usuario, asegurándose de que sea un booleano
      const newState = userInfo.state ?? this.state; // Usa el estado actual si userInfo.state es undefined
      if (newState !== this.state) {
        this.state = newState;
      }
      
    }, error => {
      console.error('Error fetching user info:', error);
    });
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation(); // Detiene la propagación del evento de clic
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuOpen = false;
      this.profileMenuOpen = false; // Cierra el menú del perfil si se hace clic fuera
    }
  }

  logout() {
    this.sweetAlertService.showConfirmation(
      'Tu cuenta será cerrada, ¿estas seguro de continuar?',
      'Cierre de sesión', 'Si', 'No'
    ).then((result) => {
      if (result.isConfirmed) {
        this.apiService.changeState(true).subscribe(
          (response) => {
            localStorage.clear();
            this.sweetAlertService.showSuccess('Cierre de sesión exitoso', 'assets/icons/check.gif')
                // Esperar un breve período antes de recargar la página
                setTimeout(() => {
                  window.location.reload();
                }, 1000); // 1000 ms = 1 segundo
          },
          (error) => {
            console.error('Error al cerrar sesión:', error);
          }
        );
      } else {
        this.sweetAlertService.showSuccess('Cierre de sesión cancelado', 'assets/icons/error.gif');
      }
    });
  }
  
}
