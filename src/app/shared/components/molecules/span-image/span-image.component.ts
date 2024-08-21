import { Component, Input } from '@angular/core';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-span-image',
  templateUrl: './span-image.component.html',
  styleUrls: ['./span-image.component.scss']
})
export class SpanImageComponent {
  constructor(
    private sweetAlertService: SweetAlertService,
  ){}
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() text: string = '';

  copyToClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.text).then(() => {
        this.sweetAlertService.showSuccess('Texto copiado','assets/icons/check.gif')
        console.log('Texto copiado al portapapeles1:', this.text);
      }).catch(err => {
        console.error('Error al copiar el texto1:', err);
      });
    } else {
      // Fallback para navegadores más antiguos
      const textarea = document.createElement('textarea');
      textarea.value = this.text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        console.log('Texto copiado al portapapeles:', this.text);
      } catch (err) {
        console.error('Error al copiar el texto:', err);
      }
      document.body.removeChild(textarea);
    }
  }
}
