import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlacesService } from '../../../../core/services/places-service.service';

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
  @Input() list: boolean = true;
  @Input() isReadOnly: boolean = false;
  @Input() placeholder: string = '';
  @Input() styleIcon: 'input-icon' | 'icon-shearSpesific' | 'iconAddTransport' | 'boat' | 'input-icon-room' | 'sheartIA' = 'input-icon';
  @Input() styleinput: 'input-text' | 'input-naviera-searchSpesific' | 'input-number-searchSpesific' | 'input-shearSpesific' | 'addTransport' | 'input-text2' | 'inputIA' | 'input-number' | 'input-text-naviera' | 'input-number2' | 'input-register' = 'input-text';
  
  @Output() textChanged = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<void>();

  @Input() inputControl: FormControl = new FormControl();

  filteredSuggestions: any[] = [];

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.inputControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (value) {
          return this.placesService.searchPlaces(value);
        } else {
          return of([]);
        }
      })
    ).subscribe(suggestions => {
      this.filteredSuggestions = this.formatSuggestions(suggestions);
      console.log('Filtered Suggestions:', this.filteredSuggestions); // Verifica que se está asignando correctamente
      this.textChanged.emit(this.inputControl.value);
      this.onChange(this.inputControl.value);
    });

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

  selectSuggestion(suggestion: any) {
    const formattedValue = this.formatSuggestion(suggestion);
  
    if (formattedValue !== 'Sin nombre disponible') {
      this.inputControl.setValue(formattedValue, { emitEvent: true });
      this.filteredSuggestions = [];
    } else {
      console.error('Error: Valor no válido');
    }
  }
   
  
  formatSuggestion(suggestion: any): string {
    const city = suggestion?.address?.city || '';
    const country = suggestion?.address?.country || '';
    const formatted = `${city} ${country}`.trim();
    return suggestion?.formatted || 'Sin nombre disponible';
  }
  


  formatSuggestions(suggestions: any[]): any[] {
    return suggestions.map(suggestion => ({
      ...suggestion,
      display_name: suggestion.formatted || 'Sin nombre disponible' // Usa 'formatted'
    }));
  }

}