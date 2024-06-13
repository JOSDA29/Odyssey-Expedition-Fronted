import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/atoms/button/button.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { CheckCircleComponent } from './components/atoms/check-circle/check-circle.component';
import { StarRatingComponent } from './components/atoms/star-rating/star-rating.component';
import { TagInfoComponent } from './components/atoms/tag-info/tag-info.component';
import { SharedInputComponent } from './components/atoms/shared-input/shared-input.component';
import { FormInputComponent } from './components/atoms/form-input/form-input.component';
import { LineComponent } from './components/atoms/line/line.component';
import { ChatbotComponent } from './components/atoms/chatbot/chatbot.component';
import { CardsServiceComponent } from './components/molecules/cards/cards-service/cards-service.component';
import { StarGrouComponent } from './components/molecules/star-grou/star-grou.component';
import { PrincipalNavbarComponent } from './components/organisms/principal-navbar/principal-navbar.component';
import { ContactNavbarComponent } from './components/organisms/contact-navbar/contact-navbar.component';
import { SecondaryNavbarComponent } from './components/organisms/secondary-navbar/secondary-navbar.component';
import { PrincipalFooterComponent } from './components/organisms/principal-footer/principal-footer.component';
import { OverFooterComponent } from './components/organisms/over-footer/over-footer.component';
import { ErrorStatusComponent } from './components/templates/status/error-status/error-status.component';
import { ConstructionStatusComponent } from './components/templates/status/construction-status/construction-status.component';
import { LoadingStatusComponent } from './components/templates/status/loading-status/loading-status.component';
import { EmptyStatusComponent } from './components/templates/status/empty-status/empty-status.component';



@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    CheckCircleComponent,
    StarRatingComponent,
    TagInfoComponent,
    SharedInputComponent,
    FormInputComponent,
    LineComponent,
    ChatbotComponent,
    CardsServiceComponent,
    StarGrouComponent,
    PrincipalNavbarComponent,
    ContactNavbarComponent,
    SecondaryNavbarComponent,
    PrincipalFooterComponent,
    OverFooterComponent,
    ErrorStatusComponent,
    ConstructionStatusComponent,
    LoadingStatusComponent,
    EmptyStatusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
