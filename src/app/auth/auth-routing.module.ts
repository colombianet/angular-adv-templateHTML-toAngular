import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Rutas principales
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const RUTAS: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( RUTAS ) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
