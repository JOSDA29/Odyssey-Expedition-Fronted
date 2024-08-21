import { Component, Output, EventEmitter } from '@angular/core';
import { ModalServiceUpdateImage } from '../../services/edit-section-info.service';
import { ApiService } from '../../../../core/services/api.service';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-update-image',
  templateUrl: './modal-update-image.component.html',
  styleUrls: ['./modal-update-image.component.scss']
})
export class ModalUpdateImageComponent {
  @Output() imageSelected = new EventEmitter<string>();

  images = [
    { srcImage: 'assets/images/avatar1.png', altImage: 'avatar1', selected: false },
    { srcImage: 'assets/images/avatar2.png', altImage: 'avatar2', selected: false },
    { srcImage: 'assets/images/avatar3.png', altImage: 'avatar3', selected: false },
    { srcImage: 'assets/images/avatar4.png', altImage: 'avatar4', selected: false },
    { srcImage: 'assets/images/avatar5.png', altImage: 'avatar5', selected: false },
    { srcImage: 'assets/images/avatar6.png', altImage: 'avatar6', selected: false },
    { srcImage: 'assets/images/avatar7.png', altImage: 'avatar7', selected: false },
    { srcImage: 'assets/images/avatar8.png', altImage: 'avatar8', selected: false },
  ];

  constructor(
    private modalServiceUpdateImage: ModalServiceUpdateImage,
    private apiService: ApiService,
    private sweetAlertService: SweetAlertService,
  ) {}

  selectImage(selectedImage: { srcImage: string, altImage: string, selected: boolean }) {
    this.images.forEach(image => image.selected = false);
    selectedImage.selected = true;
    this.imageSelected.emit(selectedImage.srcImage);
  }

  async saveImageUpdate() {
    const selectedImage = this.images.find(image => image.selected);
    if (selectedImage) {
      this.sweetAlertService.showLoading('Por favor espera.','Actualizando imagen...')
      try {
        const file = await this.imageUrlToFile(selectedImage.srcImage);
        this.apiService.updateImage(file).subscribe(
          response => {
            window.location.reload(); // Recargar la página mientras se muestra el spinner
          },
          error => {
            Swal.close(); // Cerrar el spinner
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al actualizar la imagen.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      } catch (error) {
        Swal.close(); // Cerrar el spinner
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al convertir la imagen.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    this.modalServiceUpdateImage.closeModal();
  }

  cancelImageUpdate() {
    this.modalServiceUpdateImage.closeModal();
  }

  private imageUrlToFile(imageUrl: string): Promise<File> {
    return new Promise((resolve, reject) => {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], 'image.png', { type: blob.type });
          resolve(file);
        })
        .catch(reject);
    });
  }
}
