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
  cliente: String;
}
