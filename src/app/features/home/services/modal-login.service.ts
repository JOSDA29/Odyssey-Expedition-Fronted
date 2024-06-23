import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalLoginComponent } from '../components/modal-login/modal-login/modal-login.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public modalVisible: boolean = false;
  private dialogRef: MatDialogRef<ModalLoginComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  openModal(): void {
    this.modalVisible = true;
    // Abre el modal utilizando MatDialog y guarda la referencia
    this.dialogRef = this.dialog.open(ModalLoginComponent);

    // Maneja el evento de cierre del modal
    this.dialogRef.afterClosed().subscribe(() => {
      this.modalVisible = false;
      this.dialogRef = null;
    });
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
