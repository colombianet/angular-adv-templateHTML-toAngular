import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Módulo Rutas Hijas
import { PagesRoutingModule } from './pages/pages.routing';

import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

// Módulo Rutas principales
import { AuthRoutingModule } from './auth/auth-routing.module';


const RUTAS: Routes = [
  // path: 'dashboard' module: PagesRoutingModule
  // path: 'auth' module: AuthRoutingModule
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagesfoundComponent }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( RUTAS ),
    PagesRoutingModule,
    AuthRoutingModule
   ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
