import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoComponent } from './historico/historico.component';
import { CronometroComponent } from '../components/cronometro/cronometro.component';
import { CronometrarComponent } from './cronometrar/cronometrar.component';

const routes: Routes = [
  {
    path: '',
    component: CronometrarComponent,
  },
  {
    path: 'historico',
    component: HistoricoComponent,
  },
];

@NgModule({
  declarations: [HistoricoComponent, CronometrarComponent, CronometroComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
