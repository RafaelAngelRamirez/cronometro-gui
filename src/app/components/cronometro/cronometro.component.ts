import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Periodo } from 'src/app/services/cronometro.service';

import { DateTime, DateTimeFormatOptions } from 'luxon';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css'],
})
export class CronometroComponent implements OnInit, OnDestroy {
  inicio_txt = '';
  private _inicio = DateTime.now().toJSDate();
  public get inicio() {
    return this._inicio;
  }
  public set inicio(value) {
    this._inicio = value;
    const options: DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    this.inicio_txt = value.toLocaleDateString('es-ES', options);
  }
  transcurrido: string = 'NO INICIADO';

  private _periodo: Partial<Periodo> | undefined = undefined;
  intervalo: ReturnType<typeof setTimeout> = setTimeout(() => {}, 1000);
  public get periodo(): Partial<Periodo> | undefined {
    return this._periodo;
  }
  @Input()
  public set periodo(value: Partial<Periodo> | undefined) {
    clearInterval(this.intervalo);
    this._periodo = value;

    console.log('set =>', value?.fin)
    if (value?.inicio) {
      this.inicio = new Date(value?.inicio);
      this.transcurrido = this.calcularTranscurrido(this.inicio);
      if (!value?.fin) {
        this.intervalo = setInterval(() => {
          this.transcurrido = this.calcularTranscurrido(this.inicio);
        }, 1000);
      } else this.calcularTranscurrido(value.fin);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  constructor() {}

  ngOnInit(): void {}

  calcularTranscurrido(inicio: Date) {
    let trans = DateTime.now()
      .diff(DateTime.fromJSDate(inicio))
      .toFormat('hh:mm:ss');
    return trans;
  }
}
