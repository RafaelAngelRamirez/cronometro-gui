import { NgModule, LOCALE_ID } from '@angular/core';

import es from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlBaseInterceptor } from './interceptors/url-base.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlBaseInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
