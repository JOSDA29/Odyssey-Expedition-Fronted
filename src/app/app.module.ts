import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsInfoComponent } from './features/about-us/components/cards-info/cards-info.component';
import { HistoryInfoComponent } from './features/about-us/components/history-info/history-info.component';
import { TeamInfoComponent } from './features/about-us/components/team-info/team-info.component';
import { AboutUsComponent } from './features/about-us/pages/about-us/about-us.component';
import { RegisterFormComponent } from './features/register/components/register-form/register-form.component';
import { RegisterComponent } from './features/register/pages/register/register.component';
import { SharedModule } from './shared/shared.module';
import { FeatureAModule } from './features/home/home.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CardsInfoComponent,
    HistoryInfoComponent,
    TeamInfoComponent,
    AboutUsComponent,
    RegisterFormComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FeatureAModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
