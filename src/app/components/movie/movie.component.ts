import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.less']
})
export class MovieComponent implements OnInit {
    @Input() movie?: Movie;
    posterUrl?: Observable<string>;

    constructor(private movieService: MovieService) {}

    ngOnInit() {
        this.posterUrl = this.movieService.getPosterUrl(this.movie!);
    }
}
