import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

const RUTAS: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }  },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas-1' }  },
      { path: 'account-settings', component: AccountsSettingsComponent, data: { titulo: 'Ajustar Tema' }  },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Rxjs' }  }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( RUTAS ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
