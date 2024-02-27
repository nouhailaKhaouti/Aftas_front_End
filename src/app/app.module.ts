import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { LogUpComponent } from './pages/log-up/log-up.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DatePipe } from '@angular/common';
import { MemberCompetitionsComponent } from './pages/member-competitions/member-competitions.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    RegisterComponent,
    AuthenticateComponent,
    LogUpComponent,
    MemberCompetitionsComponent,
  ],
  providers: [
    DatePipe,
      {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
