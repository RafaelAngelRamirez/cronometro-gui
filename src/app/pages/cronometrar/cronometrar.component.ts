import { Component, OnInit } from '@angular/core';
import {
  CronometroService,
  Periodo,
} from 'src/app/services/cronometro.service';

@Component({
  selector: 'app-cronometrar',
  templateUrl: './cronometrar.component.html',
  styleUrls: ['./cronometrar.component.css'],
})
export class CronometrarComponent implements OnInit {
  constructor(private service: CronometroService) {}

  private _periodo: Partial<Periodo> | undefined = undefined;
  public get periodo(): Partial<Periodo> | undefined {
    return this._periodo;
  }
  public set periodo(value: Partial<Periodo> | undefined) {
    console.log({ value });
    this._periodo = value;
  }

  accionTxt: 'iniciar' | 'guardar' = 'iniciar';

  ngOnInit(): void {}

  accion() {
    if (this.periodo) {
      this.accionTxt = 'iniciar';
      this.guardarPeriodo();
    } else {
      this.periodo = { inicio: new Date() };
      this.accionTxt = 'guardar';

      //Guardamos el registro en la bd

      this.guardarPeriodo();
    }
  }

  guardarPeriodo() {
    console.log('guardarPeriodo');

    if (!this.periodo?._id)
      this.service.save(this.periodo).subscribe((p) => {
        console.log(p);
        this.periodo = p;
      });
    else
      this.service.update(this.periodo).subscribe((p) => {
        this.periodo = p;
      });
  }
}
