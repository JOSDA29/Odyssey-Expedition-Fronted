import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {
@Input() src: string = '';
@Input() alt: string = '';
@Input() style: 'image-top' | 'backgrond-image-top' | 'image-card' = 'image-top';
}
