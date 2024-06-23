import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../features/home/services/modal-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
@Input() title: string = '';
@Input() srcclose: string = '';
@Input() altclose: string = '';
@Input() srcicon: string = '';
@Input() alticon: string = '';
@Input() textGoogle: string = '';
@Input() textContin: string = '';
@Input() textfooter: string = '';
@Input() textfooter1: string = '';
@Input() textlink: string = '';
@Input() href: string = '';

@Input() contensSection: { 
  title: string,
  placeholder:string,
}[] = [];

constructor(public modalService: ModalService) { }

closeModal(): void {
  console.log('open modal');
  this.modalService.closeModal();
}

}
