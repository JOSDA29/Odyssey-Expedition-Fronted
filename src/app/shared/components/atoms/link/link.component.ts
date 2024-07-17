import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  @Input() text: string = '';
  @Input() href: string = '';
  @Input() style: 'info-normal' | 'link-normal' = 'info-normal';
  @Input() isSelected: boolean = false;
  @Output() linkSelected = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([this.href]);
    this.linkSelected.emit();
  }

}
