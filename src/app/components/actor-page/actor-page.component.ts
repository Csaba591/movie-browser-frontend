import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor.model';
import { Movie } from 'src/app/models/movie.model';
import { ActorService } from 'src/app/services/actor.service';

@Component({
    selector: 'app-actor-page',
    templateUrl: './actor-page.component.html',
    styleUrls: ['./actor-page.component.less']
})
/**
 * Page dedicated to a single actor
 * Shows the most important details and biography
 * as well as the list of movies the actor played a role in
 */
export class ActorPageComponent implements OnInit {
    id?: number;
    actor?: Observable<Actor>;
    profileUrl?: string;
    credits?: Observable<Movie[]>;

    constructor(
        private route: ActivatedRoute,
        private actorService: ActorService
    ) {}

    ngOnInit(): void {
        /**
         * We get the actor and details based on the id from the url
         * It's important that everything is done inside the subscribe
         * callback, since the url and thus the actor can change.
         */
        this.route.params.subscribe((params) => {
            this.id = params['id'];
            this.actor = this.actorService.getActor(this.id!);
            this.actor.subscribe((actor) => {
                this.profileUrl = this.actorService.getActorProfileUrl(actor);
                this.credits = this.actorService.getCreditsForActor(actor);
            });
        });
    }
}
