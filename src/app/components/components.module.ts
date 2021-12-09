import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronometroComponent } from './cronometro/cronometro.component';
import { PeriodoComponent } from './periodo/periodo.component';

@NgModule({
  declarations: [PeriodoComponent, CronometroComponent],
  imports: [CommonModule],
  exports: [PeriodoComponent, CronometroComponent],
})
export class ComponentsModule {}
