import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CronometroService {
  url = 'cronometro';

  constructor(private http: HttpClient) {}

  save(periodo: Partial<Periodo> | undefined) {
    return this.http
      .post<Partial<Periodo>>(this.url, periodo)
      .pipe(map((x: any) => x.periodo));
  }

  update(periodo: Partial<Periodo> | undefined) {
    return this.http
      .put<Partial<Periodo>>(this.url, periodo)
      .pipe(map((x: any) => x.periodo));
  }

  ultimo() {
    return this.http
      .get<Partial<Periodo>>(this.url + '/ultimo_registro_pendiente')
      .pipe(map((x: any) => x.periodo));
  }

  todo(parametros?: any) {
    let url = this.url.concat(this.concatenarParametros(parametros));

    return this.http
      .get<Partial<Periodo>[]>(url)
      .pipe(map((x: any) => x.periodos));
  }

  clientes() {
    return this.http
      .get<string[]>(this.url + '/clientes')
      .pipe(map((x: any) => x.clientes));
  }

  proyectos() {
    return this.http
      .get<string[]>(this.url + '/proyectos')
      .pipe(map((x: any) => x.proyectos));
  }

  estatus() {
    return this.http
      .get<string[]>(this.url + '/estatus')
      .pipe(map((x: any) => x.estatus));
  }

  private concatenarParametros(p: any) {
    if (!p) return '';
    return (
      '?' +
      Object.entries(p)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    );
  }
}

export interface Periodo {
  _id: string;

  inicio: Date;
  inicio_dia: number;
  inicio_mes: number;
  inicio_anio: number;

  fin: Date;
  fin_dia: number;
  fin_mes: number;
  fin_anio: number;

  proyecto: string;
  observaciones: string;
  estatus: 'pagado' | 'pendiente' | 'cancelado' | 'en proceso';
  cliente: string;
}
