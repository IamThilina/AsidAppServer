/**
 * Created by thilina on 1/4/17.
 */
import { Component } from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DataStoreService } from "../../services/datastore.service";
import {Subscription} from "rxjs";
import {count} from "rxjs/operator/count";

@Component({
    selector: 'profile',
    templateUrl: './profile.template.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

    profile: any;
    profileID: number;
    subscription:Subscription;
    paramSubscription: Subscription;
    skills: string[];
    skillCount: number;
    skillsPerRow: number;
    facebookAvailable: boolean;
    linkedInAvailable: boolean;
    govAvailable: boolean;
    nicAvailable: boolean = false;
    motorAvailable: boolean = false;
    licenseAvailable: boolean = false;

    vehicles: string[] =  [
        "KC-2384",
        "BB-1342",
        "LL-3456"
        ];


    ngOnInit() {

        this.paramSubscription = this.route.params.subscribe(params => {
            this.profileID = params['id'];
        });

        this.subscription = this.datastoreService.profilesData$.subscribe(
            profiles => {
                this.profile = profiles[this.profileID - 1]['everything'];

                this.facebookAvailable = this.profile['socialMedia'].hasOwnProperty('facebook');
                this.linkedInAvailable = this.profile['socialMedia'].hasOwnProperty('linkedIn');
                this.govAvailable = this.profile.hasOwnProperty('government');
                if(this.govAvailable){
                    this.nicAvailable = this.profile['government'].hasOwnProperty('NIC data');
                    this.motorAvailable = this.profile['government'].hasOwnProperty('Vehicle data ');
                    this.licenseAvailable = this.profile['government'].hasOwnProperty('Driving License data');
                }

                this.skills = this.profile['socialMedia']['linkedIn']['skills'];
                this.skillCount = this.skills.length;
                this.skillsPerRow = Math.ceil(this.skillCount/3);
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