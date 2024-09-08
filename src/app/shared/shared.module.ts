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
import { ImageTopComponent } from './components/molecules/image-top/image-top.component';
import { LoginFormComponent } from './components/templates/login-form/login-form.component';
import { ImageInputTextComponent } from './components/molecules/image-input-text/image-input-text.component';
import { LinkNormalComponent } from './components/atoms/link-normal/link-normal.component';
import { RegisterFormComponent } from './components/molecules/register-form/register-form.component';
import { RegisterComponent } from './components/organisms/register/register.component';
import { IconTextComponent } from './components/molecules/icon-text/icon-text.component';
import { CardsServicesListComponent } from './components/organisms/cards-services-list/cards-services-list.component';
import { TitleSectionComponent } from './components/molecules/title-section/title-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/organisms/user-profile/user-profile.component';
import { ErrorTextComponent } from './components/atoms/error-text/error-text.component';
import { InputErrorComponent } from './components/molecules/input-error/input-error.component';
import { TemplateCardsComponent } from './components/templates/template-cards/template-cards.component';
import { FormUpdatesComponent } from './components/organisms/form-updates/form-updates.component';
import { TemplateNosotAyudaComponent } from './components/templates/template-nosot-ayuda/template-nosot-ayuda.component';
import { TemplateChatIAComponent } from './components/templates/template-chat-ia/template-chat-ia.component';
import { SearchHotelComponent } from './components/molecules/miltufaceted-search/conten-multifaceted/search-hotel/search-hotel.component';
import { SearchPaquetesComponent } from './components/molecules/miltufaceted-search/conten-multifaceted/search-paquetes/search-paquetes.component';
import { SearchCruserosComponent } from './components/molecules/miltufaceted-search/conten-multifaceted/search-cruseros/search-cruseros.component';
import { MenuAdminComponent } from './components/organisms/menu-admin/menu-admin.component';
import { HomeAdminComponent } from '../features/home-admin/home-admin.component';
import { HomeComponent } from '../features/home/pages/home/home.component';
import { HotelesAdminComponent } from './components/organisms/hoteles-admin/hoteles-admin.component';
import { NavBarAdminComponent } from './components/organisms/nav-bar-admin/nav-bar-admin.component';
import { SelectorComponent } from './components/atoms/selector/selector.component';
import { TableAdminComponent } from './components/molecules/table-admin/table-admin.component';
import { ToggleSwitchComponent } from './components/atoms/toggle-switch/toggle-switch.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModalUpdateHotelComponent } from '../features/home-admin/components/hotel-funtions/modal-update-hotel/modal-update-hotel.component';
import { TransporteAdviserComponent } from './components/organisms/transporte-adviser/transporte-adviser.component';
import { ProveedoresaAdviserComponent } from './components/organisms/proveedoresa-adviser/proveedoresa-adviser.component';
import { PackageAdviserComponent } from './components/organisms/package-adviser/package-adviser.component';
import { TextAreaComponent } from './components/atoms/text-area/text-area.component';
import { AddTransportComponent } from '../features/home-admin/components/transport-funtion/add-transport/add-transport.component';
import { CardHotelComponent } from './components/molecules/cards/card-hotel/card-hotel.component';
import { AddHotelComponent } from '../features/home-admin/components/hotel-funtions/add-hotel/add-hotel.component';
import { TransportVewComponent } from '../features/home-admin/components/transport-funtion/transport-vew/transport-vew.component';
import { TransportUpdateComponent } from '../features/home-admin/components/transport-funtion/transport-update/transport-update.component';
import { AddProveedorComponent } from '../features/home-admin/components/proveedor/add-proveedor/add-proveedor.component';
import { ModalUpdateProveedorComponent } from '../features/home-admin/components/proveedor/modal-update-proveedor/modal-update-proveedor.component';
import { VewProveedoresComponent } from '../features/home-admin/components/proveedor/vew-proveedores/vew-proveedores.component';



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
    ImageTopComponent,
    LoginFormComponent,
    ImageInputTextComponent,
    LinkNormalComponent,
    RegisterFormComponent,
    RegisterComponent,
    IconTextComponent,
    CardsServicesListComponent,
    TitleSectionComponent,
    UserProfileComponent,
    ErrorTextComponent,
    InputErrorComponent,
    TemplateCardsComponent,
    FormUpdatesComponent,
    TemplateNosotAyudaComponent,
    TemplateChatIAComponent,
    SearchHotelComponent,
    SearchPaquetesComponent,
    SearchCruserosComponent,
    MenuAdminComponent,
    HomeAdminComponent,
    HomeComponent,
    HotelesAdminComponent,
    NavBarAdminComponent,
    SelectorComponent,
    TableAdminComponent,
    ToggleSwitchComponent,
    TruncatePipe,
    ModalUpdateHotelComponent,
    TransporteAdviserComponent,
    ProveedoresaAdviserComponent,
    PackageAdviserComponent,
    TextAreaComponent,
    AddHotelComponent,
    AddTransportComponent,
    CardHotelComponent,
    TransportVewComponent,
    TransportUpdateComponent,
    AddProveedorComponent,
    ModalUpdateProveedorComponent,
    VewProveedoresComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ModalUpdateHotelComponent,
    TemplateHomeComponent,
    MultifacetedSearchComponent,
    PrincipalFooterComponent,
    RegisterComponent,
    ConstructionStatusComponent,
    CardsServicesListComponent,
    LoginFormComponent,
    SecondaryNavbarComponent,
    TemplateCardsComponent,
    TitleComponent,
    TextComponent,
    LinkNormalComponent,
    LinkNormalComponent,
    SubtitleComponent,
    IconComponent,
    TemplateNosotAyudaComponent,
    ButtonComponent,
    LogoComponent,
    TitleComponent,
    InputTextComponent,
    LineComponent,
    TemplateChatIAComponent,
    InputDateComponent,
    TextAreaComponent
  ]
})
export class SharedModule { }
