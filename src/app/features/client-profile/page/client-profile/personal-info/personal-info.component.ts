import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { Client } from '../../../models/profile-info.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() info: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.';
  conten = [
    { title: 'Nombre', text: '', altIcon: '', srcIcon: '', link: '', textUpdate: 'Editar', isEditing: false, info: 'Asegurate de escribir tu nombre sin errores ortograficos.' },
    { title: 'Apellido', text: '', altIcon: '', srcIcon: '', link: '', textUpdate: 'Editar', isEditing: false, info: 'Asegurate de escribir tu apelliod sin errores ortograficos.' },
    { title: 'Documento de identidad', text: 'No proporcionado', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu documento sin errores.' },
    { title: 'Numero telefonico', text: 'No proporcionado', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu numero telefonico sin errores.' },
  ];
  @Input() icon: string = 'assets/icons/profile.png';
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUserInfo().subscribe(
      (user: Client) => {
        this.conten[0].text = `${user.firstname}`;
        this.conten[1].text = `${user.lastname}`;
        this.conten[2].text = user.clientid || 'No proporcionado';
        this.conten[3].text = user.phone || 'No proporcionado';
        //        this.icon = user.image || 'assets/icons/profile.png';

        if (user.image && user.image.data && user.image.data.length > 0) {
          this.icon = this.arrayBufferToBase64(user.image.data);
        } else {
          this.icon = 'assets/icons/profile.png';
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  arrayBufferToBase64(buffer: number[]): string {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + window.btoa(binary);
    
  }

  onEditClicked(index: number) {
    this.conten[index].isEditing = true;
  }

  onSaveClicked(event: { newText: string, index: number }) {
    const { newText, index } = event;
    console.log('onSaveClicked called');
    // Actualiza el texto en la interfaz de usuario
    this.conten[index].text = newText;
    this.conten[index].isEditing = false;

    // Prepara los datos para la actualización
    const updatedClientData = {
      name: this.conten[0].text, // Nombre
      lastName: this.conten[1].text, // Apellido
      phoneNumber: this.conten[3].text, // Número telefónico
      image: this.icon === 'assets/icons/profile.png' ? '' : this.icon, // Solo actualiza la imagen si ha cambiado
    };

    console.log('Datos a enviar:', updatedClientData);

    // Llama al método updateClient del ApiService
    this.apiService.updateClient(
      updatedClientData.name,
      updatedClientData.lastName,
      updatedClientData.phoneNumber,
      updatedClientData.image,
    ).subscribe(
      (response) => {
        console.log('Client updated successfully:', response);
      },
      (error) => {
        console.error('Error updating client details:', error);
      }
    );
  }

  onCancelClicked(index: number) {
    this.conten[index].isEditing = false;
  }
}
