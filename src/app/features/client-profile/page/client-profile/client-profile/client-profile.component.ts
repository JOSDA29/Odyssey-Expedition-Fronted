import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
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
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }



  fetchUserProfile(): void {
    this.apiService.getUserInfo().subscribe(userInfo => {
      const userImage = userInfo.imageurl || 'assets/icons/profile.png';
      this.updateUserIcons(userImage);
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching user info:', error);
      // Use a fallback image in case of an error
      this.updateUserIcons('assets/icons/profile.png');
    });
  }

  updateUserIcons(userImage: string): void {
    this.conten = this.conten.map((item) => ({
      ...item,
      srcIcon: userImage
    }));
  }


}
