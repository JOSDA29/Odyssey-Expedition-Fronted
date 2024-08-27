import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transporte-adviser',
  templateUrl: './transporte-adviser.component.html',
  styleUrl: './transporte-adviser.component.scss'
})
export class TransporteAdviserComponent {

  @Input() titlesTopTransport:{
    title1:string,
    title2: string,
  } [] =[]

  @Input() styleHeader: 'header' | 'headerTransporte' = 'header';
  @Input() butons: 'butons1' | 'butons2'= 'butons1';
  @Input() conten: 'conten' | 'conten2' = 'conten';

  @Input() inputs:{
    tex?: string,
    input?: string,
    type?: string;
    dateStar?: string,
    dateFinish?: string,
  }[]=[]

  @Input() buttons:{
    textButon: string,
    srcButon: string,
    altButon: string
  }[]=[]

  @Input() selects:{
    options:{
      value:string, 
      label: string,
    }[]
    option: string,
    text: string,
  }[]=[]

  onOptionChange(newValue: string) {
    console.log('Selected value:', newValue);
  }

  @Input() titlesTransporte : {
    title: string ,
  }[]=[]

  @Input() itemsTransport:{
    tipe?: string, 
    name: string;
    location: string;
    id: string;
    isToggled: boolean;
  }[] = [
];
  
}
