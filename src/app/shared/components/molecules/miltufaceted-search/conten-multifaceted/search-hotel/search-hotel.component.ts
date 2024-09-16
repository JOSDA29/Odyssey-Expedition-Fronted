import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../../../core/services/api.service';
import { updateHotel } from '../../../../../../core/models/hotel/updateHotel';
import { Router } from '@angular/router';
import { SearchServiceService } from '../../../../../../core/services/search-service.service';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrl: './search-hotel.component.scss'
})
export class SearchHotelComponent implements OnInit {
  @Input() textbutton: string = '';
  ida: string = 'Ida';
  vuelta: string = 'Vuelta';
  
  @Input() contenHotel: { 
    section?: string | null,
    destination: string,
    dates: string,
    rooms: string,
    peopple?: string | null,
  }[] = [];
  hotels: any[] = [];


 

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
      destination: ['', Validators.required],
      ida: ['', Validators.required],
      vuelta: ['', Validators.required],
      peopple: ['', Validators.required],
    });
  
    // Restaurar los datos desde el sessionStorage si existen
    const savedData = sessionStorage.getItem('SearchDataH');
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
      this.form.markAllAsTouched();  // Marca todos los controles como tocados para mostrar los mensajes de error
      return;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.validateForm();
    if (this.form.valid) {
      const filter: updateHotel =  {
        location: this.destinationControl.value ,
      }

      sessionStorage.setItem('SearchDataH', JSON.stringify(this.form.value));

      console.log('Criterios de búsqueda:', filter);
      this.apiService.filterHotels(filter).subscribe(
        (response) => {
          this.hotels = response
          this.searchServiceService.updateSearchResults(response);
          this.route.navigate(['/resultSearch']); // Asegúrate de que esta ruta sea correcta
        },
        (error) => {
          console.error('Error:', error); // Revisa si hay algún error en la solicitud
        }
      );      
    }
  }

}
