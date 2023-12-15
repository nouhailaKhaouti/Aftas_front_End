import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { CompetitionModalComponent } from './components/competition-modal/competition-modal.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MdbCheckboxModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CompetitionModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }