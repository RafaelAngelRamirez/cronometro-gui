import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Periodo } from 'src/app/services/cronometro.service';

import { DateTime } from 'luxon';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css'],
})
export class CronometroComponent implements OnInit, OnDestroy {
  inicio = DateTime.now().toJSDate();
  // transcurrido: Moment = moment()
  transcurrido: string = 'SIN INICIAR';

  private _periodo: Partial<Periodo> | undefined = undefined;
  intervalo: ReturnType<typeof setTimeout> = setTimeout(() => {}, 1000);
  public get periodo(): Partial<Periodo> | undefined {
    return this._periodo;
  }
  @Input()
  public set periodo(value: Partial<Periodo> | undefined) {
    clearInterval(this.intervalo);
    this._periodo = value;

    console.log(value?.inicio);
    if (value?.inicio) {
      this.inicio = new Date(value?.inicio);
      this.transcurrido = this.calcularTranscurrido(this.inicio);
      if (!value?.fin)
        this.intervalo = setInterval(() => {
          this.transcurrido = this.calcularTranscurrido(this.inicio);
        }, 1000);
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
