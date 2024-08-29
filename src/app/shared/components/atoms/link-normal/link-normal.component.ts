import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../../features/home/services/modal-login.service';

@Component({
  selector: 'app-link-normal',
  templateUrl: './link-normal.component.html',
  styleUrl: './link-normal.component.scss'
})
export class LinkNormalComponent {
  @Input() text:string = '';
  @Input() navigateTo:string = '';
  @Input() style:'link-normal-all' | 'text-link' = 'link-normal-all';

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) { }

  navigate() {
    this.modalService.closeModal();
    this.router.navigate([this.navigateTo]);
}

}
