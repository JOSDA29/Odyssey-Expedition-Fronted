import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { PlacesService } from '../../../../core/services/places-service.service';
import { debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() isReadOnly: boolean = false; 
  @Input() list: boolean = true;
  @Input() type: string = 'text';
  @Input() max?: number;
  @Input() style: 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' | 'addTransport' | 'inputUpdateHotelDescrip' | 'inputUpdateHotel' | 'inputAdmin' | 'input-text-naviera' | 'input-naviera-searchSpesific' | 'input-text2' | 'input-desible' | 'inputIA' | 'input-number' | 'input-number2' | 'input-update' | 'input-register' = 'input-text';
  
  @Output() enterPressed = new EventEmitter<void>();
  
  @Input() control = new FormControl();
  suggestions: any[] = [];

  constructor(private placesService: PlacesService) {
    // Escuchar los cambios en el input con debounce de 300ms
    this.control.valueChanges
      .pipe(
        debounceTime(300) // Espera de 300ms antes de ejecutar la búsqueda
      )
      .subscribe(value => {
        if (value && value.length > 2) { // Solo buscar si hay más de 2 caracteres
          this.fetchSuggestions(value); // Realizar la búsqueda de sugerencias
        } else {
          this.suggestions = [];
        }
      });
  }

  fetchSuggestions(value: string) {
    // Llamada al servicio para obtener las sugerencias de lugares
    if (value && value.length > 2) {
      this.placesService.searchPlaces(value).pipe(
        catchError(error => {
          console.error('Error al obtener lugares:', error);
          return of([]); // Retorna un array vacío en caso de error
        })
      ).subscribe(results => {
        this.suggestions = Array.isArray(results) ? results : [];
      });
    } else {
      this.suggestions = [];
    }
  }

  // Métodos del ControlValueAccessor
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  // Manejo de la tecla Enter
  onEnter(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      event.preventDefault();
      this.enterPressed.emit();
    }
  }

  // Seleccionar una sugerencia de la lista
  selectSuggestion(suggestion: any) {
    const formattedValue = this.formatSuggestion(suggestion);
  
    if (formattedValue !== 'Sin nombre disponible') {
      this.control.setValue(formattedValue, { emitEvent: true });
      this.suggestions = [];
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
