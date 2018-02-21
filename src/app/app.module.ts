import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// DropZone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from './dropzone/dropzone.config';

// Notificaciones y Alertas;
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOptionToastr } from './options/custom-option-toastr';
import { SweetAlertService } from 'ngx-sweetalert2';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// Smart Table
import { Ng2SmartTableModule } from 'ng2-smart-table';

// FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

// FullCandelar
import {CalendarModule} from 'ap-angular2-fullcalendar';
import {CalendarComponent} from 'ap-angular2-fullcalendar';
// DatePicker
import { DateTimePickerModule } from 'ng-pick-datetime';

// Editor HTML
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// Services
import { MeliService } from './services/meli.service';
import { Meliapi } from './services/melici.service';
import { ImgurService } from './services/imgur.service';
import { MessageService } from './services/message/message.service';
import { BypassService } from './services/bypass/bypass.service';
import { AuthGuardMlService } from './services/auth-guard-ml/auth-guard-ml.service';

// Modulos Boostrap 4 Angular 4
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// // Cloudnary Storage
// import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular';
// import { Cloudinary } from 'cloudinary-core';

// Routes
import { APP_ROUTING } from './app.routes';

// Pipes
import { DatePipe } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallbackComponent } from './components/callback/callback.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsComponent } from './components/search/products/products.component';
import { UsersComponent } from './components/search/users/users.component';
import { ViewproductComponent } from './components/search/viewproduct/viewproduct.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { PublicadasComponent, ButtonViewComponent } from './components/publicaciones/publicadas/publicadas.component';
import { PublicarComponent } from './components/publicaciones/publicar/publicar.component';
import { PublicarloteComponent } from './components/publicaciones/publicarlote/publicarlote.component';
import { ListingTypePipe } from './pipes/listing-type.pipe';
import { CbimgComponent } from './components/cbimg/cbimg.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { PreguntasComponent, ButtonQuestComponent, NgbdModalContentComponent, NgbdModalContentallComponent } from './components/feedback/preguntas/preguntas.component';
import { RespuestasComponent } from './components/feedback/respuestas/respuestas.component';
import { LoginComponent } from './components/login/login.component';
import { LoginmlComponent } from './components/loginml/loginml.component';
import { AccessComponent } from './components/access/access.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    CallbackComponent,
    SearchComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    ViewproductComponent,
    PublicacionesComponent,
    PublicadasComponent,
    ButtonViewComponent,
    NgbdModalContentComponent,
    NgbdModalContentallComponent,
    PublicarComponent,
    PublicarloteComponent,
    ListingTypePipe,
    CbimgComponent,
    FeedbackComponent,
    PreguntasComponent,
    ButtonQuestComponent,
    RespuestasComponent,
    LoginComponent,
    LoginmlComponent,
    AccessComponent
  ],
  entryComponents: [
    PublicadasComponent,
    ButtonViewComponent,
    ButtonQuestComponent,
    PreguntasComponent,
    NgbdModalContentComponent,
    NgbdModalContentallComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CalendarModule,
    Ng2SmartTableModule,
    DateTimePickerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    AngularFireDatabaseModule,
    APP_ROUTING
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-VE' },
    MeliService,
    Meliapi,
    DatePipe,
    ImgurService,
    MessageService,
    SweetAlertService,
    BypassService,
    AuthGuardMlService,
    { provide: ToastOptions, useClass: CustomOptionToastr },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
