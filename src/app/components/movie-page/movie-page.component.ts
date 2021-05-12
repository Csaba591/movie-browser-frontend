import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor.model';
import { Movie } from 'src/app/models/movie.model';
import { ActorService } from 'src/app/services/actor.service';
import { MovieService } from 'src/app/services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-movie-page',
    templateUrl: './movie-page.component.html',
    styleUrls: ['./movie-page.component.less']
})
/**
 * Page dedicated to a single movie
 * Shows backdrop image as the background
 * The first tab shows important details
 * related to the story and making of the movie
 * The second tab shows a list of actors credited
 * The third tab shows a list of similar movies
 */
export class MoviePageComponent implements OnInit {
    id?: number;
    movie?: Observable<Movie>;
    videoUrl?: SafeResourceUrl;
    backdropUrl?: string;
    cast?: Observable<Actor[]>;
    similarMovies?: Observable<Movie[]>;
    selectedIndex = 0;

    constructor(
        private movieService: MovieService,
        private actorService: ActorService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        /**
         * We load the movie based on the id in the URL
         * It's important we load everything in the subscribe callback
         * since the id in the URL can change when the user gets redirected
         * to another movie page and then we need to update the whole page
         */
        this.route.params.subscribe((params) => {
            this.id = params['id'];
            this.movie = this.movieService.getMovie(this.id!);
            this.movie.subscribe((movie) => {
                this.movieService.getVideoUrl(movie).subscribe(
                    // The trailer video URL needs to be considered safe to load
                    (url) =>
                        (this.videoUrl = url.length
                            ? this.sanitizer.bypassSecurityTrustResourceUrl(url)
                            : undefined)
                );
                this.backdropUrl = this.movieService.getBackdropUrl(movie);
                this.cast = this.actorService.getActorsForMovie(movie);
                this.similarMovies = this.movieService.getSimilarMovies(movie);
            });
            /**
             * The selected tab index needs to be reset when loading a new
             * movie, since if the user gets redirected from the similar
             * movies tab, the page won't switch to the overview tab when
             * loading the new movie.
             */
            this.selectedIndex = 0;
        });
    }

    // Open link in new tab
    openUrl(url: string): void {
        window.open(url, '_blank');
    }

    getAmountInMillions(amount?: number): string {
        return amount ? '$' + Math.round(amount / 1000000) + 'M' : 'unknown';
    }
}
