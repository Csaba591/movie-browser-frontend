import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private basePath: string = '/api/movies/';

    constructor(private http: HttpClient) {}

    getMovie(id?: number | string): Observable<Movie> {
        if (id === undefined) {
            return of();
        }
        const url = this.basePath + id;
        const queryParams = { extended: 'full' };
        return this.http.get<Movie>(url, { params: queryParams });
    }

    getPopularMovies(): Observable<Movie[]> {
        const url = this.basePath + 'popular';
        return this.http.get<Movie[]>(url);
    }
}
