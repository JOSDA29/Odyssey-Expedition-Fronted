import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
  @Input() textSelect: string = '';
  @Input() selectId: string = '';
  @Input() options: { value: string, label: string }[] = [];
  @Input() selectedValue: string = '';
  @Input() selectClass: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.valueChanged.emit(selectElement.value);
  }
}
