import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movie.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'Movie Browser';
}
