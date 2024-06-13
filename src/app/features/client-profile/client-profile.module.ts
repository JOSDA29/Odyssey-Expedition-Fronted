import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsInfoComponent } from './components/sections-info/sections-info.component';
import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { ClientProfileComponent } from './page/client-profile/client-profile/client-profile.component';
import { PersonalInfoComponent } from './page/client-profile/personal-info/personal-info.component';
import { SecurityComponentComponent } from './page/client-profile/security.component/security.component.component';
import { BookingHistoryComponent } from './page/client-profile/booking-history/booking-history.component';
import { DisableProfileComponent } from './page/client-profile/disable-profile/disable-profile.component';

@NgModule({
  declarations: [
    SectionsInfoComponent,
    ClientProfileComponent,
    PersonalInfoComponent,
    SecurityComponentComponent,
    BookingHistoryComponent,
    DisableProfileComponent
  ],
  imports: [
    CommonModule,
    ClientProfileRoutingModule
  ]
})
export class ClientProfileModule { }
