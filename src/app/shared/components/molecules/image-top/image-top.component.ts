import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-conten-top',
  templateUrl: './image-top.component.html',
  styleUrl: './image-top.component.scss'
})
export class ImageTopComponent {
@Input() topsubtitle: string = '';
@Input() imagestyle: string = '';
@Input() toptitle: string = '';
@Input() style:'image-top-home' ='image-top-home';
}
