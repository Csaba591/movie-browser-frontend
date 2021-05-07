import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';

@Component({
    selector: 'app-actor',
    templateUrl: './actor.component.html',
    styleUrls: ['./actor.component.less']
})
/**
 * View of a single actor
 * Shows the name and an image of the actor (if available)
 */
export class ActorComponent implements OnInit {
    // The actor instance is provided with an input data binding
    @Input() actor?: Actor;
    profileUrl?: string;

    constructor(private actorService: ActorService) {}

    ngOnInit(): void {
        this.profileUrl = this.actorService.getActorProfileUrl(this.actor!);
    }
}
