import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalUpdateImageComponent } from '../components/modal-update-image/modal-update-image.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceUpdateImage {
  public modalVisible: boolean = false;
  private dialogRef: MatDialogRef<ModalUpdateImageComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  openModal(): MatDialogRef<ModalUpdateImageComponent> {
    this.modalVisible = true;
    // Abre el modal utilizando MatDialog y guarda la referencia
    this.dialogRef = this.dialog.open(ModalUpdateImageComponent);

    // Maneja el evento de cierre del modal
    this.dialogRef.afterClosed().subscribe(() => {
      this.modalVisible = false;
      this.dialogRef = null;
    });

    return this.dialogRef;
  }

  closeModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.modalVisible = false;
    }
  }

  isModalOpen(): boolean {
    return this.modalVisible;
  }
}
