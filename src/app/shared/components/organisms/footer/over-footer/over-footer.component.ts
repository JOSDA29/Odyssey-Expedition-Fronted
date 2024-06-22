import { Component } from '@angular/core';

@Component({
  selector: 'app-over-footer',
  templateUrl: './over-footer.component.html',
  styleUrl: './over-footer.component.scss'
})
export class OverFooterComponent {
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
