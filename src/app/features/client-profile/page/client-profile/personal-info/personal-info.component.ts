import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() info: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.'

  conten = [
    { title: 'Nombre completo', text: '', altIcon: '', srcIcon: '', link: '', textUpdate: 'Editar', isEditing: false, info: 'Asegurate de escribir tu nombre sin errores ortograficos.' },
    { title: 'Documento de identidad', text: 'No proporcionado', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu documento sin errores.' },
    { title: 'Numero telefonico', text: 'No proporcionado', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu numero telefonico sin errores.' },
    { title: 'Direccion', text: 'No proporcionado', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu direccion sin errores.' }
  ];
  @Input() icon: string = 'assets/icons/profile.png';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const userId = sessionStorage.getItem('userId'); // Obtener el ID del usuario desde sessionStorage
    if (userId) {
      this.apiService.getUserInfo(+userId).subscribe(
        (user) => {
          this.conten[0].text = `${user.firstName} ${user.lastName}`;
          this.conten[1].text = user.identityDocument || 'No proporcionado';
          this.conten[2].text = user.phoneNumber || 'No proporcionado';
          this.conten[3].text = user.address || 'No proporcionado';
          this.icon = user.image || 'assets/icons/profile.png'
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.error('User ID not found in sessionStorage');
    }
  }

  onEditClicked(index: number) {
    this.conten[index].isEditing = true;
  }

  onSaveClicked(newText: string, index: number) {
    this.conten[index].text = newText;
    this.conten[index].isEditing = false;
  }

  onCancelClicked(index: number) {
    this.conten[index].isEditing = false;
  }
}
