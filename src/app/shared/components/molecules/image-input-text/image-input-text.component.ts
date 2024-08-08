import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-input-text',
  templateUrl: './image-input-text.component.html',
  styleUrls: ['./image-input-text.component.scss']
})
export class ImageInputTextComponent {
  @Input() type: string = '';
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() placeholder: string = '';
  @Input() styleIcon: 'input-icon' | 'sheartIA' = 'input-icon';
  @Input() styleinput: 'input-text' | 'inputIA' | 'input-number' | 'input-register' = 'input-text';

  @Output() textChanged = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<void>();

  inputControl: FormControl = new FormControl();

  ngOnInit() {
    this.inputControl.valueChanges.subscribe(value => {
      this.textChanged.emit(value);
    });
  }

  onEnterPressed() {
    this.enterPressed.emit();
  }
}
