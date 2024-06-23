import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
@Input() srclogo: string = '';
@Input() altlogo: string = '';
@Input() srcfondo: string = '';
@Input() altfodo: string = '';
@Input() srcicon: string = '';
@Input() alticon: string = '';
@Input() textGoogle: string = '';
@Input() href: string = '';
@Input() textContin: string = '';
@Input() textfooter: string = '';
@Input() textfooter1: string = '';

@Input()  contens:{
  title: string,
  placeholder:string,
} [] = [];


}
