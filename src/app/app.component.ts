import { Component } from '@angular/core';
import { Periodo } from './services/cronometro.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cronometro';

  date = new Date()
  time = new Date()


  periodo:Partial<Periodo> = {
    inicio: new Date()
  }


  constructor (){}

}
