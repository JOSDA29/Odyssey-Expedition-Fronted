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
import { PrincipalNavbarComponent } from './components/organisms/nav-bar/principal-navbar/principal-navbar.component';
import { ContactNavbarComponent } from './components/organisms/nav-bar/contact-navbar/contact-navbar.component';
import { SecondaryNavbarComponent } from './components/organisms/nav-bar/secondary-navbar/secondary-navbar.component';
import { PrincipalFooterComponent } from './components/organisms/footer/principal-footer/principal-footer.component';
import { OverFooterComponent } from './components/organisms/footer/over-footer/over-footer.component';
import { ErrorStatusComponent } from './components/templates/status/error-status/error-status.component';
import { ConstructionStatusComponent } from './components/templates/status/construction-status/construction-status.component';
import { LoadingStatusComponent } from './components/templates/status/loading-status/loading-status.component';
import { EmptyStatusComponent } from './components/templates/status/empty-status/empty-status.component';
import { SpanTextComponent } from './components/atoms/span-text/span-text.component';
import { SpanImageComponent } from './components/molecules/span-image/span-image.component';
import { TemplateHomeComponent } from './components/templates/template-home/template-home.component';
import { TitleComponent } from './components/atoms/title/title.component';
import { SubtitleComponent } from './components/atoms/subtitle/subtitle.component';
import { TextComponent } from './components/atoms/text/text.component';
import { StatusComponent } from './components/atoms/status/status.component';
import { LinkComponent } from './components/atoms/link/link.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { NavBarComponent } from './components/molecules/nav-bar/nav-bar.component';
import { MultifacetedSearchComponent } from './components/organisms/multifaceted-search/multifaceted-search.component';
import { ContenMultifacetedComponent } from './components/molecules/miltufaceted-search/conten-multifaceted/conten-multifaceted.component';
import { CheckBoxComponent } from './components/atoms/check-box/check-box.component';
import { ShareButtonComponent } from './components/molecules/miltufaceted-search/share-button/share-button.component';
import { InputTextComponent } from './components/atoms/input-text/input-text.component';
import { InputDateComponent } from './components/atoms/input-date/input-date.component';
import { ImagesComponent } from './components/atoms/images/images.component';
import { LinkListComponent } from './components/molecules/link-list/link-list.component';



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
    EmptyStatusComponent,
    SpanTextComponent,
    SpanImageComponent,
    TemplateHomeComponent,
    TitleComponent,
    SubtitleComponent,
    TextComponent,
    StatusComponent,
    LinkComponent,
    LogoComponent,
    NavBarComponent,
    ShareButtonComponent,
    MultifacetedSearchComponent,
    ContenMultifacetedComponent,
    CheckBoxComponent,
    InputTextComponent,
    InputDateComponent,
    ImagesComponent,
    LinkListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    TemplateHomeComponent
  ]
})
export class SharedModule { }
