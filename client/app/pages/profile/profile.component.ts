/**
 * Created by thilina on 1/4/17.
 */
import { Component } from "@angular/core";

import { DataStoreService } from "../../services/datastore.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'profile',
    templateUrl: './profile.template.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

    profile: any;
    subscription:Subscription;

    constructor(private datastoreService: DataStoreService ) {}

    ngOnInit() {

        this.subscription = this.datastoreService.profileData$.subscribe(
            profile => {
                this.profile = profile
            }
        );
    }

}