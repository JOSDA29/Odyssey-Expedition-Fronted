import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialogRefs: Map<string, MatDialogRef<any>> = new Map();

  constructor(
    private dialog: MatDialog
  ) {}

  openModal<T>(component: Type<T>, id: string, data?: any): void {
    if (this.dialogRefs.has(id)) {
      return; // Evita abrir el mismo modal dos veces
    }

    const dialogRef = this.dialog.open(component, { data });
    this.dialogRefs.set(id, dialogRef);

    dialogRef.afterClosed().subscribe(() => {
      this.dialogRefs.delete(id);
    });
  }

  closeModal(id: string): void {
    const dialogRef = this.dialogRefs.get(id);
    if (dialogRef) {
      dialogRef.close();
      this.dialogRefs.delete(id);
    }
  }

  isModalOpen(id: string): boolean {
    return this.dialogRefs.has(id);
  }
}
