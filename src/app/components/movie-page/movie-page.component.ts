import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Ratings } from 'src/app/models/ratings.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie-page',
    templateUrl: './movie-page.component.html',
    styleUrls: ['./movie-page.component.less']
})
export class MoviePageComponent implements OnInit {
    id?: number | string;
    model?: Observable<Movie>;
    ratings?: Observable<Ratings>;

    constructor(
        private movieService: MovieService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = params['id'];
        });

        this.model = this.movieService.getMovie(this.id!); // TODO: fix !
        this.model.subscribe(
            (movie) => (this.ratings = this.movieService.getRatings(movie))
        );
    }
}
