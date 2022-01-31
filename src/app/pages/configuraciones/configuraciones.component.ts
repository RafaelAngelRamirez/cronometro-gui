import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CronometroService,
  Periodo,
} from 'src/app/services/cronometro.service';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css'],
})
export class ConfiguracionesComponent implements OnInit, OnDestroy {
  constructor(
    private service: CronometroService,
    private fechaService: FechasService
  ) {}

  periodos: Partial<Periodo>[] = [];
  periodosBD: Partial<Periodo>[] = [];
  clientes: string[] = [];
  proyectos: string[] = [];
  estatus: string[] = [];

  periodoActual: Partial<Periodo> = {} as Partial<Periodo>;
  transcurrido = '';

  intervalo: any;

  filtros = {
    cliente: '',
    proyecto: '',
    estatus: '',
    fin_dia: '',
    inicio_dia: '',
    fin_mes: '',
    inicio_mes: '',
  };

  totalHoras = '';

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  ngOnInit(): void {
    this.editarPeriodo();
    this.obtenerTodosLosPeriodos();
    this.obtenerClientes();
    this.obtenerProyectos();
    this.obtenerEstatus();
  }
  obtenerEstatus() {
    this.service.estatus().subscribe((pro) => (this.estatus = pro));
  }

  obtenerProyectos() {
    this.service.proyectos().subscribe((pro) => (this.proyectos = pro));
  }
  obtenerClientes() {
    this.service.clientes().subscribe((pro) => (this.clientes = pro));
  }

  obtenerTodosLosPeriodos() {
    this.service.todo(this.filtros).subscribe((ps) => {
      this.periodos = ps;
      this.periodosBD = ps;

      this.calcularTotalHoras(ps);
    });
  }
  calcularTotalHoras(ps: Partial<Periodo>[]) {
    let resultado = ps
      .map((p) => {
        if (p.inicio && p.fin)
          return this.fechaService.calcularTranscurridoEnHoras(p.inicio, p.fin);
        if (p.inicio)
          return this.fechaService.calcularTranscurridoEnHoras(p.inicio);

        return this.fechaService.calcularTranscurridoEnHoras(new Date());
      })
      .reduce((pre, cur) => cur + pre, 0);

    this.totalHoras = Math.round((resultado + Number.EPSILON) * 100) / 100 + '';
  }

  editarPeriodo(per: Partial<Periodo> | undefined = undefined) {
    let procesarPeriodo = (p: Partial<Periodo>) => {
      this.periodoActual = p;
      this.calcularTranscurrido(p);
      if (!p.fin) {
        this.intervalo = setInterval(() => {
          this.calcularTranscurrido(p);
        }, 1000);
      }
    };

    if (!per) this.service.ultimo().subscribe(procesarPeriodo);
    else procesarPeriodo(per);
  }

  calcularTranscurrido(p: Partial<Periodo>) {
    if (p.inicio)
      this.transcurrido = this.fechaService.calcularTranscurrido(
        p.inicio,
        p.fin
      );
  }

  save() {
    this.service.update(this.periodoActual).subscribe(() => {});
  }
}
