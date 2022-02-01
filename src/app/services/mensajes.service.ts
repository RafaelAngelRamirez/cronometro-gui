import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor() {}
  
  confirmacion(msj: string) {
    return confirm(msj);
  }
  
  info(msj: string)
  {
    alert(msj)
  }
}
