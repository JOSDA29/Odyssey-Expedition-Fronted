import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-input-text',
  templateUrl: './image-input-text.component.html',
  styleUrls: ['./image-input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageInputTextComponent),
      multi: true
    }
  ]
})
export class ImageInputTextComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() isReadOnly: boolean = false;
  @Input() placeholder: string = '';
  @Input() styleIcon: 'input-icon' | 'iconAddTransport' | 'boat' | 'input-icon-room' | 'sheartIA' = 'input-icon';
  @Input() styleinput: 'input-text' | 'addTransport' | 'input-text2' | 'inputIA' | 'input-number' | 'input-text-naviera' | 'input-number2' | 'input-register' = 'input-text';

  @Output() textChanged = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<void>();

  @Input() inputControl: FormControl = new FormControl ;

  onChange = (_: any) => {};
  onTouched = () => {};

  ngOnInit() {
    this.inputControl.valueChanges.subscribe(value => {
      this.textChanged.emit(value);
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  onEnterPressed() {
    this.enterPressed.emit();
  }
}
