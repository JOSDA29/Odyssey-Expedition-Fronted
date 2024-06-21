import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
@Input() srclogo:string = '';
@Input() altlogo:string =  '';
@Input() srcicon:string = '';
@Input() alticon:string =  '';
@Input() links: { href: string, text: string }[] = [];
@Input() text:string = '';

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
