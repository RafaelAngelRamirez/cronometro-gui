import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlBaseInterceptor } from './interceptors/url-base.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlBaseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
