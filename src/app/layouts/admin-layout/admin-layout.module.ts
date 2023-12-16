import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionComponent } from 'src/app/pages/competition/competition.component';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { DisplayCompetitionComponent } from 'src/app/pages/display-competition/display-competition.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    TablesComponent,
    CompetitionComponent,
    MemberComponent,
    DisplayCompetitionComponent,
  ]
})

export class AdminLayoutModule {}
