import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlBaseInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    if (!request.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${environment.url_base(request.url)}`.replace(
        /([^:]\/)\/+/g,
        '$1'
      );
      request = request.clone({ url });
    }

    return next.handle(request);
  }
}
