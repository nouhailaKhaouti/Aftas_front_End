import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { LogUpComponent } from './pages/log-up/log-up.component';

const routes: Routes =[
  {
    path: '',component:AuthenticateComponent,
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
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
  {
    path:'register',component:LogUpComponent
  }

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
