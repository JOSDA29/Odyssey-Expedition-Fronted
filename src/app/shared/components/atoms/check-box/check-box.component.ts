import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss'
})
export class CheckBoxComponent {
  @Input() label: string = '';    
  @Input() isChecked: boolean = false;
  @Output() checkedChange: EventEmitter<void> = new EventEmitter<void>();

  onCheckboxChange() {
    this.checkedChange.emit();
  }
}
