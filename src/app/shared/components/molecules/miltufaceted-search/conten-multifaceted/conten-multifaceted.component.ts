import { ChangeDetectorRef, Component, EventEmitter, INJECTOR, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';
import { searchFligth } from '../../../../../core/models/transport/searchFligths';
import { Router } from '@angular/router';
import { SearchServiceService } from '../../../../../core/services/search-service.service';

@Component({
  selector: 'app-conten-multifaceted',
  templateUrl: './conten-multifaceted.component.html',
  styleUrls: ['./conten-multifaceted.component.scss']
})
export class ContenMultifacetedComponent implements OnInit {
  

  @Output() searchCompleted = new EventEmitter<void>(); 

  @Input() botonClose: boolean = false;
  @Input() min: number = 2;
  @Input() max: number = 6;
  @Input() style : 'conten-multifaceted' | 'conten-searchSpasific' = 'conten-multifaceted';
  @Input() styleInputText: 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' = 'input-text';
  @Input() styleInputIcon: 'input-icon' | 'icon-shearSpesific' | 'iconAddTransport' | 'boat' | 'input-icon-room' | 'sheartIA' = 'input-icon';
  @Input() styleInputNumber: 'input-number' | 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' = 'input-number';
  @Input() styleDate: 'input-text-wrapper' | 'input-text-wrapper-search' = 'input-text-wrapper';
  @Input() textbutton: string = '';
  ida: string = 'Ida';
  vuelta: string = 'Vuelta';
  tramoida: string = 'Seleccione una fecha';
  tramodestination:string = 'Ingrese una ciudad';
  tramoorigin:string = 'Ingrese una ciudad';

  @Input() contensSection: { 
    title: string,
    section?: string | null,
    origin: string,
    destination: string,
    dates: string,
    peopple: string,
  }[] = [];

  @Input() checkboxes: { 
    label: string, 
    isChecked: boolean 
  }[] = [];

  @Input() checkMenu: number = 0;
  form!: FormGroup;
  submitted = false;

  tramos: Array<{ 
    origin: FormControl, 
    destination: FormControl, 
    ida: FormControl 
  }> = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private searchServiceService: SearchServiceService<any>,
  ) {}
  savedData = sessionStorage.getItem('SearchDataV');
  
  ngOnInit() {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      ida: ['', Validators.required],
      vuelta: [''],
      peopple: ['', Validators.required], 
    });
    
    this.addTramo();
    this.addTramo();
  
    if (this.savedData) {
      const parsedData = JSON.parse(this.savedData);
      // Update form values
      this.form.patchValue({
        ...parsedData,
      });
      this.ida = parsedData.ida || '';
      this.vuelta = parsedData.vuelta || 'Vuelta';
    }
    
    this.updateFormValidators(); // Asegúrate de aplicar las validaciones iniciales
  }  

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }

  get originControl(): FormControl {
    return this.form.get('origin') as FormControl;
  }

  get destinationControl(): FormControl {
    return this.form.get('destination') as FormControl;
  }

  get peoppleControl(): FormControl {
    return this.form.get('peopple') as FormControl;
  }
  
  get idaControl(): FormControl {
    return this.form.get('ida') as FormControl;
  }
  
  get vueltaControl(): FormControl {
    return this.form.get('vuelta') as FormControl;
  }

  validateForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();  
      return;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.validateForm();
  
    if (this.form.valid) {
      // Verifica si 'vuelta' es 'Vuelta' y lo establece como vacío si es así
      const arrivalDate = this.form.value.vuelta === 'Vuelta' ? '' : this.form.value.vuelta || '';
  
      const searchCriteria: searchFligth = {
        transportType: 'vuelo',
        origin: this.originControl.value,
        destination: this.destinationControl.value,
        arrivalDate,  
        departureDate: this.form.value.ida || '', 
      };
  
  
      // Crear una copia de los valores del formulario
      const formValueCopy = { ...this.form.value };
  
      // Si 'vuelta' es igual a 'Vuelta', asignar una cadena vacía
      if (formValueCopy.vuelta === 'Vuelta') {
        formValueCopy.vuelta = '';  // Asigna un valor vacío
      }
  
      // Guardar los valores ajustados en sessionStorage
      sessionStorage.setItem('SearchDataV', JSON.stringify(formValueCopy));
  
      this.apiService.filterTransport(searchCriteria).subscribe(
        (response) => {
          this.searchServiceService.updateSearchResults(response);
          this.route.navigate(['/resultSearch']);
          this.searchCompleted.emit();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is invalid',this.form.value);
    }
  }  


  onCheckboxChange(selectedIndex: number) {
    this.checkboxes = this.checkboxes.map((checkbox, index) => ({
      ...checkbox,
      isChecked: index === selectedIndex
    }));
    this.checkMenu = selectedIndex;
  
  
    // Actualiza las validaciones en función del valor de checkMenu
    this.updateFormValidators();
    
    if (this.checkMenu !== 0) {
      this.vuelta = 'Vuelta';
    } else {
      if (this.savedData) {
        const parsedData = JSON.parse(this.savedData);
        this.vuelta = parsedData.vuelta ? String(parsedData.vuelta) : 'Vuelta';
      }
    }
  
  }

  updateFormValidators(): void {
    const vueltaControl = this.form.get('vuelta');
    if (vueltaControl) {
      if (this.checkMenu === 1) {
        // Si checkMenu es 1, no se requiere el campo 'vuelta'
        vueltaControl.clearValidators();
      } else {
        // Si checkMenu no es 1, 'vuelta' es requerido
        vueltaControl.setValidators([Validators.required]);
      }
      vueltaControl.updateValueAndValidity(); // Actualiza la validez del campo
    }
  }

  addTramo() {
    if (this.tramos.length < this.max) {
      const newTramo = {
        origin: new FormControl('', Validators.required),
        destination: new FormControl('', Validators.required),
        ida: new FormControl('', Validators.required)
      };
      this.tramos.push(newTramo);
    }
  }

  removeTramo(index: number) {
    if (this.tramos.length > this.min) {
      this.tramos.splice(index, 1);
    }
  }
  close(){
    this.searchCompleted.emit();
  }
}
