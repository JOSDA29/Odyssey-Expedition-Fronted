import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service'; // Asegúrate de ajustar la ruta correcta
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {

  conten = [
    { title: 'Datos personales', text: 'Proporciona tus datos personales e indícanos cómo podemos ponernos en contacto contigo', altIcon: 'icon-personal', srcIcon: '', link: '/personalInfo', textUpdate: '', isEditing: false },
    { title: 'Inicio sesión y seguridad', text: 'Actualiza la contraseña y protege tu cuenta', altIcon: 'icon-contact', srcIcon: '', link: '/register', textUpdate: '', isEditing: false },
    { title: 'Historial de reservas', text: 'Revisa todas la reservas que haz realizado hasta el momento', altIcon: 'icon-contact', srcIcon: '', link: '/', textUpdate: '', isEditing: false }
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    const fallbackImage = 'assets/icons/profile.png';
    this.updateUserIcons(fallbackImage);
  }

  loadUserProfile(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.fetchUserProfile(+userId);
    }
  }

  fetchUserProfile(userId: number): void {
    this.apiService.getUserInfo(userId).subscribe(userInfo => {
      const userImage = userInfo.image || 'assets/icons/profile.png';
      this.updateUserIcons(userImage);
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching user info:', error);
      // Use a fallback image in case of an error
      const fallbackImage = 'assets/icons/profile.png';
      this.updateUserIcons(fallbackImage);
    });
  }

  updateUserIcons(userImage: string): void {
    this.conten = this.conten.map((item) => {
      const updatedItem = {
        ...item,
        srcIcon: userImage
      };
      return updatedItem;
    });
  }
}
