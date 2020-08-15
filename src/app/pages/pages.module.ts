import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';






@NgModule({
  declarations: [
    Graficas1Component,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    AccountsSettingsComponent,
    PromesasComponent
  ],
  exports: [
    Graficas1Component,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    PromesasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
