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
    @Input() traktId?: number;

    model?: Observable<Movie>;

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.model = this.movieService.getMovie(this.traktId);
    }
}
