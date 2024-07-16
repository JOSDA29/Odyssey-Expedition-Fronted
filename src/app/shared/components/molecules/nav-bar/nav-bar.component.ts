import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-login.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    private authGoogleService: AuthGoogleService,
    private router: Router,
  ) { }

  @Input() srclogo: string = '';
  @Input() altlogo: string = '';
  @Input() srcicon: string = '';
  @Input() alticon: string = '';
  @Input() links: { href: string, text: string }[] = [];
  @Input() text: string = '';

  selectedLinkIndex: number | null = null;

  ngOnInit() {
    this.selectDefaultLink();
  }

  selectDefaultLink() {
    const savedIndex = localStorage.getItem('selectedLinkIndex');
    if (savedIndex !== null) {
      this.selectedLinkIndex = parseInt(savedIndex, 10);
    } else {
      this.selectedLinkIndex = 0;
    }
  }

  selectLink(index: number) {
    this.selectedLinkIndex = index;
    localStorage.setItem('selectedLinkIndex', index.toString());
  }

  isModalOpen = false;

  openLoginModal(): void {
    // Verificar la bandera de sesión en sessionStorage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // Si el usuario ya está autenticado, redirigir a la página de perfil del cliente
      this.router.navigate(['/clientProfile']);
      return;
    }
    this.modalService.openModal();
  }
}
