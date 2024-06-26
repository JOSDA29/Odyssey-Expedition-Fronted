import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { RegisterComponent } from './features/register/pages/register/register.component';
import { ClientProfileComponent } from './features/client-profile/page/client-profile/client-profile/client-profile.component';
import { ConstructionStatusComponent } from './shared/components/templates/status/construction-status/construction-status.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'clientProfile',
    component: ConstructionStatusComponent,
  },
  {
    path: 'nosotros',
    component: ConstructionStatusComponent,
  },{
    path: 'ayuda',
    component: ConstructionStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
