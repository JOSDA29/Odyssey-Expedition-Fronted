import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiFacetedSearchComponent } from './components/multi-faceted-search/multi-faceted-search.component';
import { ModalLoginComponent } from './components/modal-login/modal-login/modal-login.component';
import { ModalRecoverPasswordComponent } from './components/modal-recover-password/modal-recover-password/modal-recover-password.component';
import { FeatureARoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SearchPageComponent } from './pages/search-page/search-page.component';

@NgModule({
  declarations: [
    MultiFacetedSearchComponent,
    ModalLoginComponent,
    ModalRecoverPasswordComponent,
    SearchPageComponent,   
  ],
  imports: [
    CommonModule,
    FeatureARoutingModule,
    SharedModule,
  ]
})
export class FeatureAModule { }
