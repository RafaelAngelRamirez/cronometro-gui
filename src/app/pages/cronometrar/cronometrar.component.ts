import { Component, OnInit } from '@angular/core';
import {
  CronometroService,
  Periodo,
} from 'src/app/services/cronometro.service';

@Component({
  selector: 'app-cronometrar',
  templateUrl: './cronometrar.component.html',
  styleUrls: ['./cronometrar.component.css'],
})
export class CronometrarComponent implements OnInit {
  constructor(private service: CronometroService) {}

  private _periodo: Partial<Periodo> | undefined = undefined;
  public get periodo(): Partial<Periodo> | undefined {
    return this._periodo;
  }
  public set periodo(value: Partial<Periodo> | undefined) {
    this._periodo = value;
  }

  ultimosPeriodos: Partial<Periodo>[] = [];

  accion: 'iniciar' | 'detener' = 'iniciar';

  ngOnInit(): void {
    this.service.ultimo().subscribe((periodo) => {
      if (periodo) {
        this.periodo = periodo;
        if (!this.periodo?.fin) this.accion = 'detener';
      } else this.periodo = undefined;
    });

    this.service
      .todo()
      .subscribe((periodos) => (this.ultimosPeriodos = periodos));
  }

  ejecutarAccion() {
    switch (this.accion) {
      case 'iniciar':
        this.periodo = { inicio: new Date() };
        this.accion = 'detener';
        this.nuevoPeriodo();
        break;
      case 'detener':
        this.accion = 'iniciar';
        this.finalizarPeriodo();
        break;

      default:
        break;
    }
  }

  nuevoPeriodo() {
    this.service.save(this.periodo).subscribe((p) => {
      this.periodo = p;
    });
  }

  finalizarPeriodo() {
    if (this.periodo) this.periodo['fin'] = new Date();
    this.service.update(this.periodo).subscribe((p) => {
      this.ultimosPeriodos = [
        this.periodo as Partial<Periodo>,
        ...this.ultimosPeriodos,
      ];
      this.periodo = undefined;
    });
  }
}
