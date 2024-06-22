import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrl: './share-button.component.scss'
})
export class ShareButtonComponent {
@Input() contens: { src: string, alt: string, text: string }[] = [];
selectedLinkIndex: number | null = null;

ngOnInit() {
  this.selectDefaultLink();
}

selectDefaultLink() {
  this.selectedLinkIndex = 0;
}

selectLink(index: number) {
  this.selectedLinkIndex = index;
}
}
