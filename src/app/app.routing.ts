import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { LogUpComponent } from './pages/log-up/log-up.component';
import { notAuthGuard } from './guards/not-auth.guard';
import { authGuard } from './guards/auth.guard';


const routes: Routes =[
  {
    path: '',component:AuthenticateComponent,
    pathMatch: 'full',

  },  
  {
    path:'register',component:LogUpComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard'
  // },


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],

})
export class AppRoutingModule { }
