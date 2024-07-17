import { Component, Input } from '@angular/core';
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
    altIcon: string,
    srcIcon: string,
    link: string,
    textUpdate:string
  }[] = [];

  constructor(private router: Router) {}

  onCardClick(link: string) {
    if (link) {
      this.router.navigate([link]);
    }
  }
}
