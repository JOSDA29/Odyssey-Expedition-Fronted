import { Component, Output, EventEmitter } from '@angular/core';
import { ModalServiceUpdateImage } from '../../services/edit-section-info.service';
import { ApiService } from '../../../../core/services/api.service';

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
  ) {}

  selectImage(selectedImage: { srcImage: string, altImage: string, selected: boolean }) {
    this.images.forEach(image => image.selected = false);
    selectedImage.selected = true;
    this.imageSelected.emit(selectedImage.srcImage);
  }

  async saveImageUpdate() {
    const selectedImage = this.images.find(image => image.selected);
    if (selectedImage) {
      try {
        const file = await this.imageUrlToFile(selectedImage.srcImage);
        this.apiService.updateImage(file).subscribe(
          response => {
            console.log('Imagen actualizada con éxito:', response);
            window.location.reload();
          },
          error => {
            console.error('Error al actualizar la imagen:', error);
          }
        );
      } catch (error) {
        console.error('Error al convertir la imagen:', error);
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
