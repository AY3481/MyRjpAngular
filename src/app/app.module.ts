import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { SecuredComponent } from './pages/secured/secured.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

import { LoaderComponent } from './_shared/loader/loader.component';
import { ConfirmationDialogComponent } from './_shared/confirmation-dialog/confirmation-dialog.component';
import { AddEditCustomerComponent } from './pages/add-edit-customer/add-edit-customer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/common/auth.service';
import { AuthGuard } from './_helpers/auth.guard';
import { ProfileResolve } from './_helpers/profile-resolver';
import { Api } from './_helpers/api';
import { CommonService } from './_services/common/common.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './_helpers/http-interceptor';

import { ProxyService } from './_services/proxy.service';
import { AddCustomerAccountComponent } from './pages/add-customer-account/add-customer-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    ConfirmationDialogComponent,    
    SecuredComponent, AddEditCustomerComponent, AddCustomerAccountComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,    
    HttpClientModule,
    ReactiveFormsModule,    
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatIconModule,
    MatGridListModule,
    MatSelectModule
  ],
  providers: [
    AuthGuard, ProfileResolve, AuthService, Api, CommonService, ProxyService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
