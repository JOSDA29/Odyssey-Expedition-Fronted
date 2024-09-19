import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { searchFligth } from '../../../../../../core/models/transport/searchFligths';
import { SearchServiceService } from '../../../../../../core/services/search-service.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../../core/services/api.service';

@Component({
  selector: 'app-search-cruseros',
  templateUrl: './search-cruseros.component.html',
  styleUrl: './search-cruseros.component.scss'
})
export class SearchCruserosComponent implements OnInit{

  @Output() searchCompleted = new EventEmitter();
  @Input() botonClose: boolean = false;

  @Input() style : 'crusero-search' | 'conten-searchSpasific' = 'crusero-search';
  @Input() styleInputText: 'input-text' | 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' = 'input-text';
  @Input() styleInputIcon: 'input-icon' | 'icon-shearSpesific' | 'iconAddTransport' | 'boat' | 'input-icon-room' | 'sheartIA' = 'input-icon';
  @Input() styleInputNumber: 'input-number2' | 'input-text' | 'input-number-searchSpesific' | 'input-shearSpesific' = 'input-number2';
  @Input() styleDate: 'input-text-wrapper' | 'input-text-wrapper-search' = 'input-text-wrapper';
  @Input() styleNaviera: 'input-text-naviera' | 'input-naviera-searchSpesific' = 'input-text-naviera'

  monthExit: string = 'Todos los meses'
  monthDuration: string = 'Cualquier duración';

  @Input()   contenCruseros: { 
    section?: string | null,
    destination: string,
    exit: string,
    duration: string,
    port: string,
    boat: string,
    naviera: string,
  }[] = [];

  form!: FormGroup;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: Router,
    private searchServiceService: SearchServiceService<any>,
  ) {}

  savedData = sessionStorage.getItem('SearchDataC');

  ngOnInit() {
    this.form = this.fb.group({
      destination: ['', Validators.required],
      exit: ['', Validators.required],
      duration: ['', Validators.required],
      port: ['', Validators.required],
      boat: ['', Validators.required],
      naviera: ['', Validators.required],
    });

    if (this.savedData) {
      const parsedData = JSON.parse(this.savedData);
      // Update form values
      this.form.patchValue({
        ...parsedData,
      });
      this.monthExit = parsedData.exit || 'Todos los meses';
      this.monthDuration = parsedData.duration || 'Cualquier duración';
    }

  }

  get destinatioControl(): FormControl{
    return this.form.get('destination') as FormControl;
  }

  get exitControl(): FormControl{
    return this.form.get('exit') as FormControl;
  }

  get durationControl(): FormControl{
    return this.form.get('duration') as FormControl;
  }

  get portControl(): FormControl{
    return this.form.get('port') as FormControl;
  }

  get boatControl(): FormControl{
    return this.form.get('boat') as FormControl;
  }

  get navieraControl(): FormControl{
    return this.form.get('naviera') as FormControl;
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
      const searchCriteria: searchFligth = {
        transportType: 'crucero',
        origin: this.portControl.value,
        destination: this.destinatioControl.value,
        arrivalDate: this.form.value.duración || '',  
        departureDate: this.form.value.exit || '', 
      };    
      console.log('Datos de búsqueda: ', searchCriteria);

      sessionStorage.setItem('SearchDataC', JSON.stringify(this.form.value));

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
      console.log('Form is invalid',this.form.value);
    }
  }

  close(){
    this.searchCompleted.emit();
  }

}
