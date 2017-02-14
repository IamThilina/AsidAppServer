/**
 * Created by thilina on 2/10/17.
 */
import { Component } from "@angular/core";
import {  Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

import 'rxjs/add/operator/switchMap';
import { DataStoreService } from "../../services/datastore.service";

@Component({
    selector: 'landing',
    templateUrl: './landing.template.html',
    styleUrls: ['./landing.component.css']
})

export class LandingComponent {

    hideModal: boolean = false;

    constructor(
        private searchService: SearchService,
        private router: Router
    ) {}

    onPublicUser(): void{
        this.searchService.authorizePublicUser().then(
            response => {
                localStorage.setItem("name", response.name);
                this.router.navigate(['find']);
            }, error => {
                alert(error.message);
            }
        );
    }

    onPrivilegedUser(form: any): void{
        this.hideModal = true;
        this.searchService.authorizePrivilegedUser(form).then(
            response => {
                localStorage.setItem("name", response.name);
                this.router.navigate(['find']);
            }, error => {
                alert(error.message);
            }
        );
    }

}