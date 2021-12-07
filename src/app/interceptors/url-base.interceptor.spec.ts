import { TestBed } from '@angular/core/testing';

import { UrlBaseInterceptor } from './url-base.interceptor';

describe('UrlBaseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UrlBaseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UrlBaseInterceptor = TestBed.inject(UrlBaseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
