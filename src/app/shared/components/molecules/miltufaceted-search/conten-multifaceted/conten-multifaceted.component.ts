import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-conten-multifaceted',
  templateUrl: './conten-multifaceted.component.html',
  styleUrl: './conten-multifaceted.component.scss'
})
export class ContenMultifacetedComponent {
  @Input() min: number = 1;
  @Input() textbutton:string = '';
  @Input() contensSection: { 
    title: string,
    section?: string | null,
    origin: string,
    destination: string,
    dates: string,
    ida?:string | null
    vuelta?:string | null
    peopple?:string | null,
  }[] = [];

  @Input() checkboxes: { 
    label: string, 
    isChecked: boolean 
  }[] = [];
}
