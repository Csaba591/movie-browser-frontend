import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
/**
 * Provider of all data related to movies
 */
export class MovieService {
    private tmdbImagePath: string = '/tmdb-img';
    private tmdbPath: string = '/tmdb';

    constructor(private http: HttpClient) {}

    /**
     * Get movie details based on id
     * @param id id of the movie
     * @returns observable movie model
     */
    getMovie(id: number): Observable<Movie> {
        const url = this.tmdbPath + '/movie/' + id;
        return this.http.get<Movie>(url);
    }

    /**
     * Query the api for the currently most popular movies
     * and save them to local storage if they're not present
     * else get them from local storage
     * @returns list of currently popular movies
     */
    getPopularMovies(): Observable<Movie[]> {
        const json = localStorage.getItem('popularMovies');
        if (json) return of(<Movie[]>JSON.parse(json));

        const url = this.tmdbPath + '/movie/popular';
        return this.http.get<any>(url).pipe(
            map((resp) => resp.results),
            tap((movies) =>
                localStorage.setItem('popularMovies', JSON.stringify(movies))
            )
        );
    }

    /**
     * Get a list of similar movies
     * @param movie movie we want similar movies to
     * @returns list of similar movies
     */
    getSimilarMovies(movie: Movie): Observable<Movie[]> {
        const url = this.tmdbPath + '/movie/' + movie.id + '/similar';
        return this.http.get<any>(url).pipe(map((resp) => resp.results));
    }

    /**
     * Get movies based on a keyword
     * @param query keyword which is part of a movie title
     * @returns movies with the keyword in their title
     */
    search(query: string): Observable<Movie[]> {
        const url = this.tmdbPath + '/search/movie';
        return this.http
            .get<any>(url, { params: { query: query } })
            .pipe(map((resp) => resp.results));
    }

    /**
     * Get poster URL for a movie
     * @param movie movie whose poster we want
     * @param posterSize size of poster, "thumbnail" or "full"
     * @returns URL of the poster image
     */
    getPosterUrl(movie: Movie, posterSize: 'thumbnail' | 'full'): string {
        const width = posterSize === 'thumbnail' ? 342 : 500;
        if (!movie.poster_path) {
            return (
                'https://via.placeholder.com/' +
                width +
                'x' +
                width * 1.5 +
                '/?text=Poster+not+found+:/'
            );
        }
        return this.tmdbImagePath + '/w' + width + movie.poster_path;
    }

    /**
     * Get movie trailer video URL
     * @param movie movie whose trailer we want
     * @returns Embeddable YouTube video URL
     */
    getVideoUrl(movie: Movie): Observable<string> {
        const url = this.tmdbPath + '/movie/' + movie.id + '/videos';
        return this.http.get<any>(url).pipe(
            map((resp) =>
                (<any[]>resp.results).filter(
                    (r) => r.site.toLowerCase() === 'youtube'
                )
            ),
            map((results) =>
                results.length
                    ? 'https://www.youtube.com/embed/' + results[0].key
                    : ''
            )
        );
    }

    /**
     * Get backdrop image URL for a movie
     * @param movie movie whose backdrop URL is needed
     * @returns backdrop image URL
     */
    getBackdropUrl(movie: Movie) {
        return this.tmdbImagePath + '/original' + movie.backdrop_path;
    }
}
