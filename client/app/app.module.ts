// DEPENDENCIES
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { AppRoutingModule }     from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


// SECURITY
import { SecurityService } from './security/services/security.service';
import { TokenEmitter } from './security/token-emitter';
import { TokenInterceptor } from './security/token-interceptor';
import { AuthenticationService } from './security/authentication.service';
import { AuthGuard } from "./security/auth.guard";

// SECURITY VIEWS
import { ManageUserListComponent } from './security/manage-user/list-user/manage-user-list.component';
import { ManageUserEditComponent } from './security/manage-user/edit-user/manage-user-edit.component';
import { ProfileComponent } from './security/profile/profile.component';
import { ModalChangePasswordComponent } from './components/modal-change-password.component';
import { LoginComponent } from './pages/login/login.component';

/* START MY VIEWS IMPORTS*/
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { HomeComponent } from './pages/home/home.component';
import { PlaceEditComponent } from './pages/place-edit/place-edit.component';

/* END MY VIEWS IMPORTS*/

/* START MY SERVICES IMPORTS*/
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
import { PlaceService } from './services/place.service';
import { UserService } from './services/user.service';

/* END MY SERVICES IMPORTS*/

// LAYOUT
import { AppComponent }  from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { SearchPipe } from './pipes/search.pipe';
import { MaterialModule } from "./material.module";
import { ModalRemoveComponent } from './components/modal-remove.component';

//DIRECTIVES
import { EqualValidator } from './directives/equal-validate.directive';
import { MailValidator } from './directives/mail-validate.directive';
import { AgmCoreModule } from '@agm/core';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCro } from './components/paginator-custom.component';

// DECLARE APPLICATION MODULE
@NgModule({
  bootstrap: [ 
    AppComponent 
  ],
  imports: [  
    AppRoutingModule, // ROUTES
    MaterialModule, // MATERIAL THEME
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDL83d6ojQ8FKKn_YxaKMoQCYA81cBKDn8'
    })
  ],
  declarations: [
    // LAYOUT
    AppComponent, 
    NavbarComponent,
    ModalRemoveComponent,
    EqualValidator,
    MailValidator,
    
     // SECURITY
    LoginComponent,
    ProfileComponent,
    ManageUserListComponent,
    ManageUserEditComponent,
    ModalChangePasswordComponent,
    
    /* START DECLARATIONS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
    HomeComponent,
    PlaceEditComponent,
 /* END DECLARATIONS */
    
    // PIPE
    SearchPipe
  ],
  entryComponents: [
    ModalRemoveComponent,
    ModalChangePasswordComponent
  ],
  providers:    [
    /* START PROVIDERS */
// Do not edit this comment content, it will be overwritten in next Skaffolder generation
    PlaceService,
    UserService,
 /* END PROVIDERS */
    
    // SECURITY
    AuthGuard,
    AuthenticationService,
    SecurityService,
    TokenEmitter,
    {provide: RequestOptions, useClass: TokenInterceptor},
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro},
  ],
})
export class AppModule { }
