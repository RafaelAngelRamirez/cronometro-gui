import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  CronometroService,
  Periodo,
} from 'src/app/services/cronometro.service';

@Component({
  selector: 'app-cronometrar',
  templateUrl: './cronometrar.component.html',
  styleUrls: ['./cronometrar.component.css'],
})
export class CronometrarComponent implements OnInit, OnDestroy {
  constructor(
    private service: CronometroService,
    private renderer: Renderer2
  ) {}

  ngOnDestroy(): void {
    this.quitarEstilos();
  }

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
      .todo({ limit: 2 })
      .subscribe((periodos) => (this.ultimosPeriodos = periodos));

    this.agregarEstilos();
  }

  clases = ['cronometro', 'cronometro_color'];

  agregarEstilos() {
    let body = document.body;

    this.clases.forEach((x) => {
      this.renderer.addClass(body, x);
    });
  }
  quitarEstilos() {
    let body = document.body;
    this.clases.forEach((x) => this.renderer.removeClass(body, x));
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
