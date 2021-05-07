import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.less']
})
/**
 * View of a single movie
 * A card with the title, release date
 * rating and poster of the movie
 */
export class MovieComponent implements OnInit {
    // The movie instance and poster size are provided with an input binding
    @Input() movie?: Movie;
    @Input() posterSize?: 'thumbnail' | 'full';
    posterUrl?: string;

    constructor(private movieService: MovieService) {}

    // Get the URL of the poster from MovieService
    ngOnInit() {
        this.posterUrl = this.movieService.getPosterUrl(
            this.movie!,
            this.posterSize || 'thumbnail'
        );
    }
}
