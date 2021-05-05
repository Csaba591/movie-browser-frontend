import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { Ratings } from '../models/ratings.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private traktPath: string = '/trakt/movies/';
    private omdbPath: string = '/omdb/';

    constructor(private http: HttpClient) {}

    getMovie(id: number | string): Observable<Movie> {
        const url = this.traktPath + id;
        const queryParams = { extended: 'full' };
        return this.http.get<Movie>(url, { params: queryParams });
    }

    getRatings(movie: Movie): Observable<Ratings> {
        const url = this.traktPath + movie.ids.slug + '/ratings';
        return this.http.get<Ratings>(url);
    }

    getPopularMovies(): Observable<Movie[]> {
        const url = this.traktPath + 'popular';
        return this.http.get<Movie[]>(url, {
            params: { limit: '50' }
        });
    }

    getPosterUrl(movie: Movie): Observable<string> {
        return this.http
            .get<any>(this.omdbPath, {
                params: { i: movie.ids.imdb }
            })
            .pipe(map<any, string>((resp) => resp.Poster));
    }
}
