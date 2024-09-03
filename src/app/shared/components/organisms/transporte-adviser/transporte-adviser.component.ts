import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-update-hotel.service';

@Component({
  selector: 'app-transporte-adviser',
  templateUrl: './transporte-adviser.component.html',
  styleUrls: ['./transporte-adviser.component.scss']
})
export class TransporteAdviserComponent {

  constructor(
    private modalService: ModalService,
  ) {}

  @Input() titlesTopTransport: { title1: string, title2: string }[] = [];
  @Input() styleHeader: 'header' | 'headerTransporte' = 'header';
  @Input() butons: 'butons1' | 'butons2' = 'butons1';
  @Input() conten: 'conten' | 'conten2' = 'conten';
  inputValues: any[] = [];

  @Input() inputs: {
    tex?: string,
    input?: string,
    type?: string;
    dateStar?: string,
    dateFinish?: string,
  }[] = [];

  @Input() buttons: {
    textButon: string;
    srcButon: string;
    altButon: string;
    configModal?: {
      addService?: any
    };
  }[] = [];

  @Input() selects: {
    options: { value: string, label: string }[],
    option: string,
    text: string,
  }[] = [];

  @Input() titlesTransporte: { title: string }[] = [];
  @Input() itemsTransport: {
    tipe?: string,
    name: string;
    location: string;
    id: string;
    isToggled: boolean;
  }[] = [];

  @Input() modalConfig: { editComponent: any; viewComponent: any } = {
    editComponent: null,
    viewComponent: null
  }

  @Input() modalConfigAdd: { addService: any; } = {
    addService: null,
  };

  ngOnInit() {
    this.inputValues = this.inputs.map(() => ({ value: '', dateStart: '', dateFinish: '' }));
  }

  getCombinedValues() {
    // Inicializar arreglos para cada tipo de dato
    const combinedValues = {
      value: [] as string[],
      dateStart: [] as string[],
      dateFinish: [] as string[]
    };

    // Combinar valores en arreglos separados
    this.inputValues.forEach(input => {
      if (input.value) combinedValues.value.push(input.value);
      if (input.dateStart) combinedValues.dateStart.push(input.dateStart);
      if (input.dateFinish) combinedValues.dateFinish.push(input.dateFinish);
    });

    // Crear objeto final con valores combinados
    return {
      value: combinedValues.value.length > 0 ? combinedValues.value.join(', ') : '',
      dateStart: combinedValues.dateStart.length > 0 ? combinedValues.dateStart.join(', ') : '',
      dateFinish: combinedValues.dateFinish.length > 0 ? combinedValues.dateFinish.join(', ') : ''
    };
  }

  onButtonClick(index: number, button: any): void {
    if (index === 0) {
      console.log('Datos combinados: ', this.getCombinedValues());
    } else if (index === 1) {
      console.log('Abriendo modal de agregar');
      this.modalConfigAdd.addService = button.configModal.addService;
      this.openModalAdd(button);
    } else {
      console.log(`Botón ${index + 1} clicado`);
    }
  }

  openModalAdd(item: any): void {
    if (this.modalConfigAdd.addService) {
      this.modalService.openModal(this.modalConfigAdd.addService, 'addService', { item });
    } else {
      console.error('El componente addService es null o no está definido.');
    }
  }
  onOptionChange(newValue: string) {
    console.log('Selected value:', newValue);
  }
}
