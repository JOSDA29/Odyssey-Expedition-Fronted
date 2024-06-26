import { Component, Input, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../../../../core/services/auth-google.service';

@Component({
  selector: 'app-construction-status',
  templateUrl: './construction-status.component.html',
  styleUrls: ['./construction-status.component.scss'] // Se debe usar 'styleUrls' en lugar de 'styleUrl'
})
export class ConstructionStatusComponent implements OnInit {

  @Input() name: string = '';
  @Input() srcicon: string = 'assets/icons/profile.png';

  constructor(private authGoogleService: AuthGoogleService) {}

  ngOnInit() {
    this.showData(); // Llamar a showData cuando el componente se inicialice
  }

  showData() {
    const data: any = JSON.stringify(this.authGoogleService.getProfile());
    const dataParser = JSON.parse(data);
    console.log(data);
    console.log(dataParser.given_name);
    this.name = dataParser.given_name;
    this.srcicon = dataParser.picture;
  }
}
