import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() description: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() title: string = '';
  @Input() placeholder: string = '';

  @Output() descriptionChange = new EventEmitter<string>();

  onDescriptionChange(newDescription: string): void {
    this.description = newDescription;
    this.descriptionChange.emit(this.description);
  }
}
