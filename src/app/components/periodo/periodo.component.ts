import { Component, Input, OnInit } from '@angular/core';
import { DateTimeFormatOptions } from 'luxon';
import { Periodo } from 'src/app/services/cronometro.service';
import { FechasService } from 'src/app/services/fechas.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css'],
})
export class PeriodoComponent implements OnInit {
  filas: Fila[] = [];
  private _periodos: Partial<Periodo>[] = [];
  public get periodos(): Partial<Periodo>[] {
    return this._periodos;
  }
  @Input()
  public set periodos(value: Partial<Periodo>[]) {
    this._periodos = value;
    this.filas = this.transformarPeriodos(value);
  }

  constructor(private fechaService: FechasService) {}

  ngOnInit(): void {}

  options: DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  transformarPeriodos(periodos: Partial<Periodo>[]) {
    return periodos
      .filter((x) => x?.fin)
      .map((periodo) => {
        let fila: Fila = {
          columnas: [],
        };

        let per = periodo as Periodo;

        fila.columnas.push(
          ...[
            {
              encabezado: 'inicio',
              dato: new Date(per.inicio).toLocaleDateString(
                'es-ES',
                this.options
              ),
            },
            {
              encabezado: 'transcurrido',
              dato: this.fechaService.calcularTranscurrido(per.inicio, per.fin),
            },

            {
              encabezado: 'proyecto',
              dato: per.proyecto,
            },
            {
              encabezado: 'cliente',
              dato: per.cliente,
            },
          ]
        );

        return fila;
      });
  }
}

interface transformaciones {
  campo: string;
  transformacion: (x: any) => any;
  esCalcudado?: boolean;
  campoParaCalculo?: string;
}

interface Fila {
  columnas: Columna[];
}

interface Columna {
  dato: string;
  encabezado: string;
}
