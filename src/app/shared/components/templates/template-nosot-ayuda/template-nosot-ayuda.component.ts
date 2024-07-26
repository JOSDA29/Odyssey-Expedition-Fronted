import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-nosot-ayuda',
  templateUrl: './template-nosot-ayuda.component.html',
  styleUrls: ['./template-nosot-ayuda.component.scss']
})
export class TemplateNosotAyudaComponent {
  @Input() topImage: string = '';
  @Input() toptitle: string = '';
  @Input () history1: string = '';
  @Input () history2: string = '';
  @Input() infoTem: string = ''
  @Input() container: {
    title: string,
    text: string,
    info?: string,
    altIcon: string,
    srcIcon: string,
    link: string,
    textUpdate: string,
    isEditing: boolean,
    type:string
  }[] = [];
}
