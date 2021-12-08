import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoricoComponent } from './historico/historico.component';
import { ComponentsModule } from '../components/components.module';
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
  declarations: [HistoricoComponent, CronometrarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule],
})
export class PagesModule {}
