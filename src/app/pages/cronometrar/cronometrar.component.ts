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
    console.log({ value });
    this._periodo = value;
  }

  ultimosPeriodos: Partial<Periodo>[] = [];

  accionTxt: 'iniciar' | 'detener' = 'iniciar';

  ngOnInit(): void {}

  accion() {
    if (this.periodo) {
      this.accionTxt = 'iniciar';
      this.finalizarPeriodo();
    } else {
      this.periodo = { inicio: new Date() };
      this.accionTxt = 'detener';
      this.nuevoPeriodo();
    }
  }

  nuevoPeriodo() {
    this.service.save(this.periodo).subscribe((p) => {
      this.periodo = p;
    });
  }

  finalizarPeriodo() {
    this.service.update(this.periodo).subscribe((p) => {
      this.ultimosPeriodos.push(p);
      this.periodo = undefined;
    });
  }
}
