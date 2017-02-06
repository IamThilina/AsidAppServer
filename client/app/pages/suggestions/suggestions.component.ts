/**
 * Created by thilina on 2/6/17.
 */
import { Component } from "@angular/core";
import { DataStoreService } from "../../services/datastore.service";
import {  ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Subscription} from "rxjs";

@Component({
    selector: 'suggestions',
    templateUrl: './suggestions.template.html',
    styleUrls: ['./suggestions.component.css']
})

export class SuggestionsComponent {

    profiles: any;
    name: string;
    subscription:Subscription;
    paramSubscription: Subscription;

    ngOnInit() {

        this.paramSubscription = this.route.params.subscribe(params => {
            this.name = params['name'];
        });

        this.subscription = this.datastoreService.profilesData$.subscribe(
            profiles => {
                this.profiles = profiles
            }
        );
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.paramSubscription.unsubscribe();
    }

    constructor(
        private datastoreService: DataStoreService,
        private route: ActivatedRoute
    ) {}

}