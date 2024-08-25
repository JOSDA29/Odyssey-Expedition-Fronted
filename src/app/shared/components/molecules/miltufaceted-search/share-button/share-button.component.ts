import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {
  @Input() contens: { src: string, alt: string, text: string }[] = [];
  @Output() selected = new EventEmitter<number>(); 
  selectedLinkIndex: number | null = null;

  ngOnInit() {
    this.selectDefaultLink();
  }

  selectDefaultLink() {
    this.selectedLinkIndex = 0;
    this.selected.emit(this.selectedLinkIndex); 
  }

  selectLink(index: number) {
    this.selectedLinkIndex = index;
    this.selected.emit(this.selectedLinkIndex); 
  }
}
