// template-cards.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-cards',
  templateUrl: './template-cards.component.html',
  styleUrls: ['./template-cards.component.scss']
})
export class TemplateCardsComponent {
  @Input() contend: 'card-nosotros' | 'persona-info' | 'card-profile' = 'card-nosotros';
  @Input() styleIcon: 'primary' | 'icons-top-nab-bar' | 'input-icon' | 'icon-nosotros' | 'ubication-icon' | 'shared-icon' | 'icon-close' | 'icon-google' | 'profile' | 'icon-text' = 'primary';
  @Input() contens: {
    title: string,
    text: string,
    info?: string,
    altIcon: string,
    srcIcon: string,
    link: string,
    textUpdate: string,
    isEditing: boolean
  }[] = [];

  @Output() save = new EventEmitter<{ newText: string, index: number }>();
  @Output() cancel = new EventEmitter<number>();

  constructor(private router: Router) {}

  onCardClick(link: string) {
    if (link) {
      this.router.navigate([link]);
    }
  }

  onEditClicked(index: number) {
    this.contens[index].isEditing = true;
  }

  onSaveClicked(newText: string, index: number) {
    this.save.emit({ newText, index });  // Emitimos el nuevo texto junto con el índice al componente superior
    this.contens[index].text = newText;  // Actualizamos el texto en la tarjeta correspondiente
    this.contens[index].isEditing = false;  // Terminamos el modo de edición
  }  

  onCancelClicked(index: number) {
    this.cancel.emit(index);
    this.contens[index].isEditing = false;
  }
}
