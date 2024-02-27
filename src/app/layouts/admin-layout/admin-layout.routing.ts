import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CompetitionComponent } from 'src/app/pages/competition/competition.component';
import { MemberComponent } from 'src/app/pages/member/member.component';
import { DisplayCompetitionComponent } from 'src/app/pages/display-competition/display-competition.component';
import { CompetitionMembersComponent } from 'src/app/pages/competition-members/competition-members.component';
import { HuntingComponent } from 'src/app/pages/hunting/hunting.component';
import { roleGuard } from 'src/app/guards/role.guard';
import { authGuard } from 'src/app/guards/auth.guard';
import { MemberCompetitionsComponent } from 'src/app/pages/member-competitions/member-competitions.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',  component:DashboardComponent },
    { path: 'tables',       component: TablesComponent ,canActivate: [authGuard,roleGuard], data: { role: ['MANAGER','JUDGES'] }},
    {path:'competition', component:CompetitionComponent,canActivate: [authGuard,roleGuard], data: { role: ['MANAGER','JUDGES'] }},
    {path:'member', component:MemberComponent,canActivate: [authGuard,roleGuard], data: { role: ['MANAGER'] }},
    {path:'competitions', component:DisplayCompetitionComponent,canActivate: [authGuard,roleGuard], data: { role: ['MANAGER','JUDGES'] }},
    {path:'competitionMembers', component:CompetitionMembersComponent,canActivate: [authGuard,roleGuard], data: { role: ['MANAGER','JUDGES'] }},
    {path:'hunting', component:HuntingComponent,canActivate: [authGuard,roleGuard], data: { role: ['MANAGER','JUDGES'] } },
    {path:'myCompetitions', component:MemberCompetitionsComponent,canActivate: [authGuard]},

];
