import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { RegisterComponent } from './features/register/pages/register/register.component';
import { ClientProfileComponent } from './features/client-profile/page/client-profile/client-profile/client-profile.component';
import { ConstructionStatusComponent } from './shared/components/templates/status/construction-status/construction-status.component';
import { PersonalInfoComponent } from './features/client-profile/page/client-profile/personal-info/personal-info.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { DisableProfileComponent } from './features/client-profile/page/client-profile/disable-profile/disable-profile.component';

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
 { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta wildcard para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // Habilitar trazado
  exports: [RouterModule]
})
export class AppRoutingModule { }
