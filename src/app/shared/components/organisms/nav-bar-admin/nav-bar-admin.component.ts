import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrl: './nav-bar-admin.component.scss'
})
export class NavBarAdminComponent {
@Input() titles:{
  title1:string,
  title2: string
}[]=[];
}
