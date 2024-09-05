import { Component, Input } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { Client } from '../../../models/profile-info.model';
import { ErrorHandlingService } from '../../../../../core/services/error-handling.service';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';

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
    private sweetAlertService:SweetAlertService,
  ){}

  textButton = 'Continuar';
  title= '¿Qué te ha llevado a desactivar tu cuenta?'
  subtitle = '';

  texts: { textConten: string; styleText:  'info-text' | 'info-text-select'}[] = [
    { textConten: '1. Motivo >', styleText: 'info-text-select' },
    { textConten: '2. Confirmar >', styleText: 'info-text' },
    { textConten: '3. Listo', styleText: 'info-text' }
  ];

  targets = [
    { text: 'Me preocupa la privacidad o la seguridad.', isChecked: false },
    { text: 'Me preocupa la privacidad o la seguridad1.', isChecked: false },
    { text: 'Me preocupa la privacidad o la seguridad2.', isChecked: false },
    { text: 'Otra', isChecked: false },
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
    const selectedTarget = this.targets.find(target => target.text === checkbox.id);
    
    if (selectedTarget) {
      selectedTarget.isChecked = checkbox.checked;
      this.selectedReason = checkbox.checked ? selectedTarget.text : '';
      
      // Desmarcar todas las demás checkboxes excepto la seleccionada
      this.targets.forEach(target => {
        if (target.text !== this.selectedReason) {
          target.isChecked = false;
        }
      });
      
      if (this.selectedReason !== 'Otra') {
        this.otherReason = '';
        console.log(this.otherReason);
        
      }
    }
    console.log(this.selectedReason);
  }    

  getTargetText(target: { text: string }): string {
    if (target.text === 'Otra' && this.isOtherSelected) {
      return this.otherReason || target.text;
    }
    return target.text;
  }



  goBack() {
    if (this.currentIndex > 0) {
      // Restablecer el estilo del texto actual
      this.texts[this.currentIndex].styleText = 'info-text';
      this.currentIndex--;
      // Actualizar el estilo del texto anterior
      this.texts[this.currentIndex].styleText = 'info-text-select';
      // Disminuye el progreso, evita valores negativos
      this.progress = Math.max(this.progress - 33.33, 0);
      this.textButton = 'Desactivar cuenta';
      
      // Restablecer el texto del botón si vuelve al inicio
      if (this.currentIndex === 0) {
        this.textButton = 'Continuar';
        this.title = '¿Qué te ha llevado a desactivar tu cuenta?';
        this.updateCheckboxes(); // Actualiza el estado de los checkboxes
      }
    }
  }
  
  updateCheckboxes() {
    this.targets.forEach(target => {
      target.isChecked = target.text === this.selectedReason;
    });
    // Limpiar el texto de otro motivo si no está seleccionado
    if (this.selectedReason !== 'Otra') {
      this.otherReason = '';
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

        this.sweetAlertService.showConfirmation(
          'Tu cuenta será desactivada, ¿estas seguro de continuar?',
          'Desactivar cuenta', 'Si', 'No'
        ).then((result) => {
          if (result.isConfirmed) {
            this.textButton = 'Cerrar'; // Cambia el texto del botón en el último paso
            this.title = 'Cuenta desactivada'            
            this.disaibleClient(this.textButton);
          } else {
            this.router.navigate(['/clientProfile']);
            this.sweetAlertService.showSuccess('Desactivacion de cuenta cancelada', 'assets/icons/error.gif');
          }
        });

      }
    }
  }

  disaibleClient(button: string) {
    // Verifica si el texto del botón es "Desactivar cuenta"
    if (button === 'Cerrar') {
      this.apiService.changeState(false).subscribe(
        (response) => {
          console.log('Estado cambiado exitosamente:', response);
          this.sweetAlertService.showSuccess('Cuenta desactivada','assets/icons/check.gif')
          localStorage.clear();
        },
        (error) => {
          console.error('Error al cambiar el estado:', error);
          // Maneja el error según sea necesario
        }
      );
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
