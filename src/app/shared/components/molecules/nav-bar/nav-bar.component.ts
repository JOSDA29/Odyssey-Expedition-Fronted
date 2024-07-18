import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-login.service';
import { AuthGoogleService } from '../../../../core/services/auth-google.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service'; 

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
    private apiService: ApiService, // Inyectar ApiService
  ) { }

  @Input() srclogo: string = '';
  @Input() altlogo: string = '';
  @Input() srcicon: string = '';
  @Input() alticon: string = '';
  @Input() links: { href: string, text: string }[] = [];
  @Input() text: string = '';

  selectedLinkIndex: number | null = null;
  userProfilePicture: string = 'assets/icons/profile.png'; // Foto de perfil por defecto

  ngOnInit() {
    this.selectDefaultLink();
    this.loadUserProfile();
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
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const isLoggedInGoogle = this.authGoogleService.isAuthenticated();
  
    if (isLoggedIn === 'true' || isLoggedInGoogle) {
      this.router.navigate(['/clientProfile']);
      this.loadUserProfile(); 
      return;
    }
  
    this.modalService.openModal();
  }

  loadUserProfile(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.fetchUserProfile(+userId);
    }
  }

  fetchUserProfile(userId: number): void {
    this.apiService.getUserInfo(userId).subscribe(userInfo => {
      console.log('User info:', userInfo);
      this.userProfilePicture = userInfo.image || 'assets/icons/profile.png'; 
      console.log('User profile picture:', this.userProfilePicture);
    }, error => {
      console.error('Error fetching user info:', error);
    });
  }
}
