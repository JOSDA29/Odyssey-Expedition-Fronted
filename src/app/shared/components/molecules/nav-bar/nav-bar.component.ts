import { ModalService } from '../../../../features/home/services/modal-login.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service'; 
import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
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

  openLoginModal(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isLoggedInGoogle = this.authGoogleService.isAuthenticated();
   if ((isLoggedIn === 'true' && this.state) || isLoggedInGoogle) {
      this.router.navigate(['/clientProfile']);
      return;
    }
    if (!this.state && isLoggedIn !== 'true') {
      this.sweetAlertService.showConfirmation(
        'Tu cuenta está desactivada, ¿quieres activarla de nuevo?',
        'Cuenta inactiva'
      ).then((result) => {
        if (result.isConfirmed) {
          this.apiService.changeState(true).subscribe(
            (response) => {
              this.state = true; // Actualizar el estado local
              this.router.navigate(['/clientProfile']);
            },
            (error) => {
              console.error('Error al actualizar el estado del cliente:', error);
            }
          );
        } else if (result.isDismissed) {
        }
      });
    } else {
      this.modalService.openModal();
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
    if (!clickedInside && this.menuOpen) {
      this.menuOpen = false;
    }
  }

  handleMenuStateChange(menuOpen: boolean) {
    // Puedes realizar acciones adicionales aquí si es necesario.
    console.log('Menu open state:', menuOpen);
  }
  
}