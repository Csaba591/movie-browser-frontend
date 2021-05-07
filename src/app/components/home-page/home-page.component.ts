import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.less']
})
/**
 * Index page listing the most popular movies in a grid view
 * Each movie card can be clicked on, taking the user
 * to the page dedicated to it.
 */
export class HomePageComponent implements OnInit {
    movies?: Observable<Movie[]>;

    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        /**
         * Searching is also done using this component
         * We load the list of movies based on whether
         * the query parameter is present in the url
         */
        this.route.queryParams.subscribe((params) => {
            const query = params['query'] || '';
            this.loadMovies(query);
        });
    }

    /**
     * Load movies based on the query parameter
     * If it's empty we load the most popular movies
     * else we load them based on the search query
     */
    loadMovies(query: string): void {
        if (!query.length) this.movies = this.movieService.getPopularMovies();
        else this.movies = this.movieService.search(query);
    }
}
