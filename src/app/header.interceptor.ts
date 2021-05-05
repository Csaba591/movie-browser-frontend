import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

enum ReqDest {
    Trakt,
    Omdb
}

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let modifiedReq: HttpRequest<any>;
        if (this.getDestination(req) === ReqDest.Omdb) {
            modifiedReq = req.clone({
                setParams: { apikey: '69016ef2' }
            });
        } else {
            modifiedReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    'trakt-api-key': environment.apikeys.trakt,
                    'trakt-api-version': '2'
                }
            });
        }

        return next.handle(modifiedReq);
    }

    getDestination(req: HttpRequest<any>): ReqDest {
        if (req.url.includes('trakt')) {
            return ReqDest.Trakt;
        }
        return ReqDest.Omdb;
    }
}
