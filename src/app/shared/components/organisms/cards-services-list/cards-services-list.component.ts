import { Component, OnInit, Input} from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Flight } from '../../../../core/models/Fligths';


@Component({
  selector: 'app-cards-services-list',
  templateUrl: './cards-services-list.component.html',
  styleUrl: './cards-services-list.component.scss'
})

export class CardsServicesListComponent implements OnInit {
  @Input() titleSection:string ='';

  public flights: Flight[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFlights()
      .subscribe(
        (res: Flight[]) => {
          this.flights = res;
        },
        (error) => {
          console.error('Error fetching flights:', error);
        }
      );
  }
}
