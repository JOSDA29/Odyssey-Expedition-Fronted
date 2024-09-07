import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input() text: string = '';
  @Input() style: 'text-normal' | 'text-secundaryTargetHotel' | 'textHotelUpdate' | 'textTableAdmin' | 'subSelector' | 'deleteTramo' | 'addTramo' | 'chatIaClient' | 'chatIA' | 'info-text' | 'info-text-select' | 'reversDisaible' | 'disaible' | 'text-nostros-profile' | 'text-link' | 'text-secundary' | 'textError1' | 'textsecundary' | 'errortext' | 'errortext1' | 'textError2' | 'info' | 'info-normal' = 'text-normal';
}
