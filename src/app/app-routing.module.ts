import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Rutas principales
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import { NopagesfoundComponent } from './pages/nopagesfound/nopagesfound.component';

// Rutas Hijas
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';

const RUTAS: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graficas1', component: Graficas1Component },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NopagesfoundComponent },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot( RUTAS ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
