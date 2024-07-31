import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { Client } from '../../../models/profile-info.model';
import { ErrorHandlingService } from '../../../../../core/services/error-handling.service';
import { ModalServiceUpdateImage } from '../../../services/edit-section-info.service';

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
    { title: 'Documento de identidad', text: '', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu documento sin errores.' },
    { title: 'Numero telefonico', text: '', altIcon: '', srcIcon: '', link: '', textUpdate: 'Agregar', isEditing: false, info: 'Asegurate de escribir tu numero telefonico sin errores.' },
  ];
  @Input() icon: string = 'assets/icons/profile.png';

  constructor(
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private modalServiceUpdateImage: ModalServiceUpdateImage,
  ) { }

  ngOnInit() {
    this.apiService.getUserInfo().subscribe(
      (user: Client) => {
        this.conten[0].text = `${user.firstname}`;
        this.conten[1].text = `${user.lastname}`;
        this.conten[2].text = user.clientid || 'No proporcionado';
        this.conten[3].text = user.phone || 'No proporcionado';
        if (user.imageurl != null) {
          this.icon = user.imageurl
        }
        console.log(user.imageurl);
      },
      (error) => {
        const errorMessage = this.errorHandlingService.handleError(error);
        console.error('Error fetching user details:', errorMessage);
      }
    );
  }

 

  onEditClicked(index: number) {
    this.conten[index].isEditing = true;
  }

  onSaveClicked(event: { newText: string, index: number }) {
    const { newText, index } = event;
    this.conten[index].text = newText;
    this.conten[index].isEditing = false;

    const updatedClientData = {
      name: this.conten[0].text,
      lastName: this.conten[1].text,
      phoneNumber: this.conten[3].text,
    };

    console.log('Datos a enviar:', updatedClientData);

    this.apiService.updateClient(
      updatedClientData.name,
      updatedClientData.lastName,
      updatedClientData.phoneNumber,
    ).subscribe(
      (response) => {
        console.log('Client updated successfully:',response);
      },
      (error) => {
        const errorMessage = this.errorHandlingService.handleError(error);
        console.error('Error updating client details:', errorMessage);
        alert(errorMessage);
      }
    );
  }

  onCancelClicked(index: number) {
    this.conten[index].isEditing = false;
  }

  openModalImage(){
    this.modalServiceUpdateImage.openModal();
  }
}
