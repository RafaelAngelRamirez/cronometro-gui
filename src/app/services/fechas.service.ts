import { Injectable } from '@angular/core';
import { DateTime, DateTimeFormatOptions } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class FechasService {
  constructor() {}

  calcularTranscurrido(inicio: Date, fin?: Date) {
    let inicioLuxon: DateTime = DateTime.fromJSDate(new Date(inicio));
    let finLuxon: DateTime;

    if (!fin) finLuxon = DateTime.now();
    else finLuxon = DateTime.fromJSDate(new Date(fin));

    return finLuxon.diff(inicioLuxon).toFormat('hh:mm:ss');
  }
 
  calcularTranscurridoEnHoras(inicio: Date, fin?: Date) {
    let inicioLuxon: DateTime = DateTime.fromJSDate(new Date(inicio));
    let finLuxon: DateTime;

    if (!fin) finLuxon = DateTime.now();
    else finLuxon = DateTime.fromJSDate(new Date(fin));

    return finLuxon.diff(inicioLuxon).as('hours')
  }
}
