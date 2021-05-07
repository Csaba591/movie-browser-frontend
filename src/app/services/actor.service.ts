import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actor } from '../models/actor.model';
import { Movie } from '../models/movie.model';

@Injectable({
    providedIn: 'root'
})
/**
 * Service that provides all data that's
 * actor related or that can be queried based on an actor
 */
export class ActorService {
    private tmdbPath: string = '/tmdb';
    private tmdbImagePath: string = '/tmdb-img';

    constructor(private http: HttpClient) {}

    /**
     * Get details for all actors in the cast for the parmeter movie
     * @param movie movie whose cast we need
     * @returns observable list of actors credited for the movie
     */
    getActorsForMovie(movie: Movie): Observable<Actor[]> {
        const url = this.tmdbPath + '/movie/' + movie.id + '/credits';
        return this.http.get<any>(url).pipe(map((cast) => cast.cast));
    }

    /**
     * Create profile picture URL if available
     * else return placeholder image URL
     * @param actor actor whose profile picture we need
     * @returns profile picture URL
     */
    getActorProfileUrl(actor: Actor): string {
        if (!actor.profile_path)
            return 'https://via.placeholder.com/500x750/?text=Profile+not+found+:/';
        return this.tmdbImagePath + '/original' + actor.profile_path;
    }

    /**
     * Get details of an actor based on its id
     * @param id id of actor we need
     * @returns observable actor model
     */
    getActor(id: number): Observable<Actor> {
        const url = this.tmdbPath + '/person/' + id;
        return this.http.get<Actor>(url);
    }

    /**
     * Get all movies an actor's been credited for
     * @param actor actor whose credits we want
     * @returns observable list of actors
     */
    getCreditsForActor(actor: Actor): Observable<Movie[]> {
        const url = this.tmdbPath + '/person/' + actor.id + '/movie_credits';
        return this.http.get<any>(url).pipe(map((cast) => cast.cast));
    }
}
