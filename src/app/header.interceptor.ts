import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@Injectable()
/**
 * HTTP request interceptor that inserts necessary headers/parameters
 */
export class APIRequestInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Add TMDB API key from loaded from .env.json
        const modifiedReq = req.clone({
            setParams: { api_key: environment.apikeys.tmdb }
        });
        return next.handle(modifiedReq).pipe(
            catchError((err) => {
                console.log(err);
                if (!this.dialog.openDialogs.length) {
                    this.dialog.open(ErrorDialogComponent, {
                        data: err.error.status_message || err.error
                    });
                }
                return EMPTY;
            })
        );
    }
}
