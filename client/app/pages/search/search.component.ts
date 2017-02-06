/**
 * Created by thilina on 1/4/17.
 */
import { Component } from "@angular/core";
import {  Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

import 'rxjs/add/operator/switchMap';
import { DataStoreService } from "../../services/datastore.service";

@Component({
    selector: 'search',
    templateUrl: './search.template.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {

    constructor(
        private searchService: SearchService,
        private datastoreService: DataStoreService,
        private router: Router
    ) {}

    onSubmit(form: any): void{
        this.searchService.search(form).then(
            response => {
                this.datastoreService.changeProfiles(response);
                this.router.navigate(['suggestions', form.name]);
            }, error => {
                alert(error.message);
            }
        );
    }

}
