import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {
  constructor(
    private sweetAlertService: SweetAlertService,
  ) {}

  @Input() options: {
    srcSelector: string,
    altSelector: string,
    selector: string,
    subOptions?: { 
      subSelector: string 
    }[]
  }[] = [];

  @Output() optionSelected = new EventEmitter<string>();
  @Output() subOptionSelected = new EventEmitter<{option: string, subOption: string}>();

  selectedOption: string = 'Inicio';
  selectedSubOption: string = '';

  selectOption(option: string, subOption?: string) {
    this.selectedOption = option;
    
    if (option === 'Servicios' && !subOption) {
    
      this.selectedSubOption = 'Hoteles';
      this.subOptionSelected.emit({ option, subOption: this.selectedSubOption });
    } else if (subOption) {
      this.selectedSubOption = subOption;
      this.subOptionSelected.emit({ option, subOption });
    } else {
      this.selectedSubOption = ''; 
      this.optionSelected.emit(option);
    }
  }

  isSelected(option: string, subOption?: string): boolean {
    if (subOption) {
      return this.selectedOption === option && this.selectedSubOption === subOption;
    }
    return this.selectedOption === option;
  }

  closeSecion() {
    this.sweetAlertService.showConfirmation(
      'Vas a cerrar sesión',
      '¿Estás seguro?',
      'Continuar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }
}
