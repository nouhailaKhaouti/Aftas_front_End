import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CompetitionComponent } from 'src/app/pages/competition/competition.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',  component:DashboardComponent },
    { path: 'tables',       component: TablesComponent },
    {path:'competition', component:CompetitionComponent},
];
