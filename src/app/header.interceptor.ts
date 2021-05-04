import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersReq = req.clone({
      setHeaders: { 
        'Content-Type': 'application/json',
        'trakt-api-key': '44512986a4d5ef94fbf4b2923d8b4a5692d6f7deef9dd3b893cf4038b6fe3e2b',
        'trakt-api-version': '2'
      }
    });

    return next.handle(headersReq);
  }
}