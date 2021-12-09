import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoComponent } from './historico/historico.component';
import { ComponentsModule } from '../components/components.module';
import { CronometrarComponent } from './cronometrar/cronometrar.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CronometrarComponent,
  },
  {
    path: 'historico',
    component: HistoricoComponent,
  },
  {
    path: 'configuracion',
    component: ConfiguracionesComponent,
  },

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    HistoricoComponent,
    CronometrarComponent,
    ConfiguracionesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    FormsModule,
  ],
})
export class PagesModule {}
