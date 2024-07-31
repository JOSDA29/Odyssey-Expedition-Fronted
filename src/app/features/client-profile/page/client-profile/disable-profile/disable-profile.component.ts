import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { Client } from '../../../models/profile-info.model';
import { ErrorHandlingService } from '../../../../../core/services/error-handling.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disable-profile',
  templateUrl: './disable-profile.component.html',
  styleUrls: ['./disable-profile.component.scss']
})
export class DisableProfileComponent {

  constructor(
    private apiService: ApiService,
    private errorHandlingService: ErrorHandlingService,
    private router: Router,
  ){}

  textButton = 'Continuar';
  title= '¿Qué te ha llevado a desactivar tu cuenta?'
  subtitle = '';

  texts: { textConten: string; styleText: 'text-normal' | 'info-text' | 'info-text-select' | 'reversDisaible' | 'disaible' | 'text-nostros-profile' | 'text-link' | 'text-secundary' | 'textError1' | 'textsecundary' | 'errortext' | 'errortext1' | 'textError2' | 'info' | 'info-normal' }[] = [
    { textConten: '1. Selecciona un motivo >', styleText: 'info-text-select' },
    { textConten: '2. Confirmar >', styleText: 'info-text' },
    { textConten: '3. Listo', styleText: 'info-text' }
  ];

  targets = [
    { text: 'Me preocupa la privacidad o la seguridad. ' },
    { text: 'Me preocupa la privacidad o la seguridad1.' },
    { text: 'Me preocupa la privacidad o la seguridad2.' },
    { text: 'Otra' },
  ];

  targets2 = [
    { text: 'No podrás acceder a la información de la cuenta ni a las reservaciones anteriores.' },
    { text: 'No podrás acceder a la información de la cuenta ni a las reservaciones anteriores.' },
    { text: 'No podrás acceder a la información de la cuenta ni a las reservaciones anteriores.' },
  ];

  selectedReason: string = '';
  otherReason: string = ''; // Para almacenar el texto del campo de entrada
  currentIndex: number = 0; // Inicialmente el primer texto
  progress: number = 33.33; // Progreso inicial

  get currentText(): string {
    return this.texts[this.currentIndex]?.textConten ?? '';
  }

  get isButtonDisabled(): boolean {
    return this.selectedReason === '';
  }

  get isOtherSelected(): boolean {
    return this.selectedReason === 'Otra';
  }

  toggleCheckbox(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedReason = checkbox.id;
    } else if (this.selectedReason === checkbox.id) {
      this.selectedReason = '';
    }

    // Desmarcar todas las demás checkboxes excepto la seleccionada
    this.targets.forEach(target => {
      const checkboxElement = document.getElementById(target.text) as HTMLInputElement;
      if (checkboxElement && checkboxElement.id !== this.selectedReason) {
        checkboxElement.checked = false;
      }
    });

    if (this.selectedReason !== 'Otra') {
      this.otherReason = '';
    }
    console.log(this.selectedReason);
  }

  getTargetText(target: { text: string }): string {
    if (target.text === 'Otra' && this.isOtherSelected) {
      return this.otherReason || target.text;
    }
    return target.text;
  }

  updateCurrentText(index: number) {
    this.currentIndex = index;
  }

  goBack() {
    if (this.currentIndex > 0) {
      this.texts[this.currentIndex].styleText = 'info-text'; // Restablecer el estilo del texto actual
      this.currentIndex--;
      this.texts[this.currentIndex].styleText = 'info-text-select'; // Actualizar el estilo del texto anterior
      this.progress = Math.max(this.progress - 33.33, 0); // Disminuye el progreso, evita valores negativos
      this.textButton = 'Desactivar cuenta';
      if (this.currentIndex === 0) {
        this.textButton = 'Continuar'; // Restablecer el texto del botón si vuelve al inicio
        this.title = '¿Qué te ha llevado a desactivar tu cuenta?'
      }
    }
  }

  continue() {
    if (this.currentIndex < this.texts.length - 1) {
      this.texts[this.currentIndex].styleText = 'info-text'; // Restablecer el estilo del texto actual
      this.currentIndex++;
      this.texts[this.currentIndex].styleText = 'info-text-select'; // Actualizar el estilo del texto siguiente
      this.progress = Math.min(this.progress + 33.33, 100); // Aumenta el progreso, evita valores mayores a 100
      this.textButton = 'Desactivar cuenta';
      this.title = '¿Estas seguro que deseas desactiviar tu cuenta?';
      if (this.currentIndex === this.texts.length - 1) {
        this.textButton = 'Cerrar'; // Cambia el texto del botón en el último paso
        this.title = 'Cuenta desactivada'
      }
    }
  }

  ngOnInit() {
    this.apiService.getUserInfo().subscribe(
      (user: Client) => {
        this.subtitle = `Luego de desactivar tu cuenta ${user.email}.`;
      },
      (error) => {
        const errorMessage = this.errorHandlingService.handleError(error);
        console.error('Error fetching user details:', errorMessage);
      }
    );
  }

  return(){
    this.router.navigate(['/']);
  }

}
