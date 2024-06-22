import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiFacetedSearchComponent } from './components/multi-faceted-search/multi-faceted-search.component';
import { CardsServiceComponent } from './components/card/cards-service/cards-service.component';
import { ModalLoginComponent } from './components/modal-login/modal-login/modal-login.component';
import { ModalRecoverPasswordComponent } from './components/modal-recover-password/modal-recover-password/modal-recover-password.component';
import { FeatureARoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    MultiFacetedSearchComponent,
    CardsServiceComponent,
    ModalLoginComponent,
    ModalRecoverPasswordComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FeatureARoutingModule,
    SharedModule
  ]
})
export class FeatureAModule { }
