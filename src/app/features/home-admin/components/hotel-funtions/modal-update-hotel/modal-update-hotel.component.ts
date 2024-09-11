import { Component, Inject, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';
import { SweetAlertService } from '../../../../../core/services/sweet-alert.service';
import { updateHotel } from '../../../../../core/models/hotel/updateHotel';
import { loadComponent } from '../../../../../core/services/hotel-update-service.service';

@Component({
  selector: 'app-modal-update-hotel',
  templateUrl: './modal-update-hotel.component.html',
  styleUrls: ['./modal-update-hotel.component.scss']
})
export class ModalUpdateHotelComponent implements OnInit {
  hotelForm!: FormGroup;
  srcImg: string = 'https://example.com/default-image.jpg';
  selectedFile: File | null = null;
  hotelId = this.data.item.id;
  cargado: boolean = false;
  serviceDescription: string = '';
  hotelDescription: string = '';

  inputs = [
    { placeholder: 'Nombre hotel', type: 'text', text: 'Nombre hotel: ', formControlName: 'name' },
    { placeholder: 'Destino', type: 'text', text: 'Destino:', formControlName: 'destination' },
    { placeholder: '', type: '', text: 'Fecha de inicio:', dateStar: 'Fecha', formControlName: 'startDate' },
    { placeholder: '', type: '', text: 'Fecha de fin:', dateStar: '', dateFinish: 'Fecha', formControlName: 'endDate' },
    { placeholder: 'Cantidad de personas', type: 'number', text: 'Número de personas:', max: 12, formControlName: 'numberOfPeople' },
    { placeholder: 'Habitación', type: 'text', text: 'Habitación:', formControlName: 'room' },
    { placeholder: 'Locación', type: 'text', text: 'Locación:', formControlName: 'location' },
    { placeholder: 'Precio', type: 'number', text: 'Precio:', formControlName: 'price' },
  ];

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private sweetAlertService: SweetAlertService,
    public dialogRef: MatDialogRef<ModalUpdateHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private hotelUpdateService: loadComponent,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.hotelId = this.data.item?.id;
    
    if (this.hotelId) {
      this.sweetAlertService.showLoading('Cargando hotel...', '', 'assets/icons/loadingData.gif');
      this.loadHotelData(this.hotelId);
    } else {
      console.error('No ID provided');
    }
    this.hotelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      destination: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      room: ['', [Validators.required]],
      location: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      serviceDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      hotelDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });  
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcImg = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getFormControl(controlName: string): FormControl {
    const control = this.hotelForm.get(controlName);
    if (!control) {
      throw new Error(`Control with name '${controlName}' not found in the form`);
    }
    return control as FormControl;
  } 
  isControlInvalid(controlName: string): boolean {
    const control = this.getFormControl(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  getInputValues(): updateHotel {
    const {name,destination,startDate,endDate,serviceDescription,hotelDescription,numberOfPeople,room,location,price} = this.hotelForm.value;
  
    return {
      id: this.hotelId, // Asigna un ID apropiado aquí si es necesario
      name,
      destination,
      startDate,
      endDate,
      numberOfPeople,
      room,
      description: hotelDescription,
      location,
      hotelServices: serviceDescription,
      price,
      state: this.data.item.state
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.hotelForm.get(controlName);
    if (control && control.errors) {
      if (control.hasError('required')) {
        return 'Campo obligatorio';
      }
      if (control.hasError('minlength')) {
        return `Debe tener al menos ${control.errors['minlength']?.requiredLength} caracteres`;
      }
      if (control.hasError('maxlength')) {
        return `No puede tener más de ${control.errors['maxlength']?.requiredLength} caracteres`;
      }
      if (control.hasError('pattern')) {
        return 'Formato inválido';
      }
      if (control.hasError('email')) {
        return 'Email inválido';
      }
    }
    return '';
  }

  loadHotelData(hotelId: string): void {
    this.cargado = false;
    const fiter: updateHotel = {
      id: String(hotelId),
    };
    this.apiService.filterHotels(fiter).subscribe(
      (data: any) => {
        this.cargado = true;
        this.sweetAlertService.hideLoading();
        if (data && data.length > 0) {
          const hotel = data[0];
          console.log('data hotel',hotel);
          this.hotelForm.patchValue({
            name: hotel.name || '',
            destination: hotel.destination || '',
            startDate: new Date(hotel.startdate).toISOString().substring(0, 10) || '',
            endDate: new Date(hotel.enddate).toISOString().substring(0, 10) || '',
            numberOfPeople: hotel.numberofpeople || 0,
            room: hotel.room || '',
            location: hotel.location || '',
            price: hotel.price || 0,
            hotelDescription: hotel.description || '',
            serviceDescription: hotel.services || '',
          });

          this.srcImg = hotel.imageurl || this.srcImg;
          this.cdr.detectChanges();
        }
      },
      error => {
        console.error('Error loading hotel data:', error);
      }
    );
  }

  saveData(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();  // Muestra todos los errores
      return;
    }
    const payload = this.getInputValues();
    console.log('data',payload);
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de actualizar este hotel?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.sweetAlertService.showLoading('Actualizando hotel...', '', 'assets/icons/loadingData.gif');
        if (this.selectedFile) {
          this.apiService.updateImageHotel(this.selectedFile, this.hotelId).subscribe(
            imageResponse => {
              this.apiService.updateHotel(payload).subscribe(
                () => {
                  this.sweetAlertService.hideLoading();
                  this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
                  this.dialogRef.close();
                },
                error => {
                  this.sweetAlertService.hideLoading();
                  this.sweetAlertService.showError('Error al actualizar el hotel');
                }
              );
            },
            error => {
              this.sweetAlertService.hideLoading();
              this.sweetAlertService.showError('Error al cargar la imagen');
            }
          );
        } else {
          this.apiService.updateHotel(payload).subscribe(
            response => {
              console.log('Hotel agregado exitosamente:', response);
              this.hotelUpdateService.notifyHotelUpdated();
              this.dialogRef.close(response);
              this.sweetAlertService.showSuccess('Actualización exitosa', 'assets/icons/check.gif');
            },
            error => {
              console.error('Error al agregar el hotel:', error);
            }
          );
        }
      }
    });
  }

  cancelData(): void {
    this.sweetAlertService.showConfirmation(
      `¿Estás seguro de cancelar?`,
      'Confirmación',
      'Aceptar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.dialogRef.close();
      }
    });
  }
}
