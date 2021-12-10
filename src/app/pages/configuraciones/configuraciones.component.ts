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

  periodoActual: Periodo = {} as Periodo;
  transcurrido = '';

  intervalo: any;

  filtros = {
    cliente: '',
    proyecto: '',
    estatus: '',
    dia: '',
    mes: '',
  };

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  ngOnInit(): void {
    this.obtenerUltimoPeriodo();
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
    });
  }

  obtenerUltimoPeriodo() {
    this.service.ultimo().subscribe((p) => {
      this.periodoActual = p;
      this.calcularTranscurrido(p);

      if (!p.fin) {
        this.intervalo = setInterval(() => {
          this.calcularTranscurrido(p);
        }, 1000);
      }
    });
  }

  calcularTranscurrido(p: Periodo) {
    this.transcurrido = this.fechaService.calcularTranscurrido(p.inicio, p.fin);
  }

  save() {
    this.service.update(this.periodoActual).subscribe(() => {});
  }
}
