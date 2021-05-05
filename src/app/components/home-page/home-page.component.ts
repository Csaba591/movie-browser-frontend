import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {
    movies: Observable<Movie[]>;

    constructor(private movieService: MovieService) {
        this.movies = this.movieService.getPopularMovies();
    }

    ngOnInit(): void {}
}
