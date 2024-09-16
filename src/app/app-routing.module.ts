import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { RegisterComponent } from './features/register/pages/register/register.component';
import { ClientProfileComponent } from './features/client-profile/page/client-profile/client-profile/client-profile.component';
import { ConstructionStatusComponent } from './shared/components/templates/status/construction-status/construction-status.component';
import { PersonalInfoComponent } from './features/client-profile/page/client-profile/personal-info/personal-info.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { DisableProfileComponent } from './features/client-profile/page/client-profile/disable-profile/disable-profile.component';
import { ErrorStatusComponent } from './shared/components/templates/status/error-status/error-status.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SearchPageComponent } from './features/home/pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'resultSearch',
    component: SearchPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'clientProfile',
    component: ClientProfileComponent,
    
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },{
    path: 'ayuda',
    component: ConstructionStatusComponent,
  },{
    path: 'personalInfo',
    component: PersonalInfoComponent,
  },
 { path: 'desactivarCuenta',
  component: DisableProfileComponent,
 },
{ path: '**',
  redirectTo: '', 
  pathMatch: 'full' 
},
{ path: 'errorpage',
  component: ErrorStatusComponent 

} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })], // Habilitar trazado
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
