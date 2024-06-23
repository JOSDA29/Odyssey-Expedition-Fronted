import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() style: 'primary' | 'icons-top-nab-bar' | 'input-icon' | 'ubication-icon' | 'shared-icon' | 'icon-close' | 'icon-google' | 'profile'| 'icon-text' = 'primary';
  @Input() navigateTo: string = ''; 

  constructor(private router: Router) { }

  onClick() {
    if (this.style === 'icons-top-nab-bar' && this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }

}
