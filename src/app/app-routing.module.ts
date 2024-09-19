import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { RegisterComponent } from './features/register/pages/register/register.component';
import { ConstructionStatusComponent } from './shared/components/templates/status/construction-status/construction-status.component';
import { PersonalInfoComponent } from './features/client-profile/page/client-profile/personal-info/personal-info.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { DisableProfileComponent } from './features/client-profile/page/client-profile/disable-profile/disable-profile.component';
import { ErrorStatusComponent } from './shared/components/templates/status/error-status/error-status.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SearchPageComponent } from './features/home/pages/search-page/search-page.component';
import { ClientProfileComponent } from './features/client-profile/page/client-profile/client-profile/client-profile.component';

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
  },
  {
    path: 'ayuda',
    component: ConstructionStatusComponent,
  },
  {
    path: 'personalInfo',
    component: PersonalInfoComponent,
  },
  {
    path: 'desactivarCuenta',
    component: DisableProfileComponent,
  },
  {
    path: 'errorpage',
    component: ErrorStatusComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AppRoutingModule { }
