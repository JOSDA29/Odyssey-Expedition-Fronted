import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { searchPaquete } from '../../../../../../core/models/paquetes/searchPaquetes';
import { SearchServiceService } from '../../../../../../core/services/search-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../../core/services/api.service';

@Component({
  selector: 'app-search-paquetes',
  templateUrl: './search-paquetes.component.html',
  styleUrl: './search-paquetes.component.scss'
})
export class SearchPaquetesComponent implements OnInit {
  @Output() searchCompleted = new EventEmitter<void>();
  @Input() botonClose: boolean = false;

  @Input() style : 'paquetes-search' | 'conten-searchSpasific' = 'paquetes-search';
  @Input() styleInputText: 'input-text2' | 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' = 'input-text2';
  @Input() styleInputIcon: 'input-icon' | 'icon-shearSpesific' | 'iconAddTransport' | 'boat' | 'input-icon-room' | 'sheartIA' = 'input-icon';
  @Input() styleInputNumber: 'input-number2' | 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' = 'input-number2';
  @Input() styleDate: 'input-text-wrapper2' | 'input-text-wrapper-search' = 'input-text-wrapper2';
  @Input() textbutton: string = '';
  ida: string = 'Ida'
  vuelta: string = 'Vuelta'


  @Input() contenPaquete: { 
    section?: string | null,
    origin: string,
    destination: string,
    dates: string,
    rooms: string,
    peopple?: string | null,
  }[] = [];

 

  form!: FormGroup;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private searchServiceService: SearchServiceService<any>,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      ida: ['', Validators.required],
      vuelta: ['', Validators.required],
      rooms: ['', Validators.required],
      peopple: ['', Validators.required],
    });

    const savedData = sessionStorage.getItem('SearchDataP');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Update form values
      this.form.patchValue({
        ...parsedData,
      });
      this.ida = parsedData.ida || '';
      this.vuelta = parsedData.vuelta || 'Vuelta';

    }
  }

  get originControl(): FormControl {
    return this.form.get('origin') as FormControl;
  }

  get destinationControl(): FormControl {
    return this.form.get('destination') as FormControl;
  }

  get roomControl(): FormControl{
    return this.form.get('rooms') as FormControl;
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
      this.form.markAllAsTouched();  // Marca todos los controles como tocados para mostrar los mensajes de error
      return;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.validateForm();
    if (this.form.valid) {
      const searchCriteria: searchPaquete = {
        origin: this.originControl.value,
        destination: this.destinationControl.value,
        departureDate: this.idaControl.value,
        returnDate: this.vueltaControl.value,
      }
      sessionStorage.setItem('SearchDataP', JSON.stringify(this.form.value));

      this.apiService.filterPaquetes(searchCriteria).subscribe(
        (response)=>{
          this.searchServiceService.updateSearchResults(response);
          this.searchCompleted.emit();
          this.route.navigate(['/resultSearch']);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
      console.log('Form is invalid',this.form.value);
    }
  }

  close(){
    this.searchCompleted.emit();
  }

}