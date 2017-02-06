/**
 * Created by thilina on 12/13/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component";

import {SearchComponent} from "./pages/search/search.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SuggestionsComponent} from "./pages/suggestions/suggestions.component";

const routes: Routes = [
    { path: 'find', component: SearchComponent },
    { path: 'profile/:name/:id', component: ProfileComponent },
    { path: 'suggestions/:name', component: SuggestionsComponent },
    { path: '**', redirectTo:'find', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ ]
})
export class AppRoutingModule {}


/*
* [routerLink]="['/absolute']"
 [routerLink]="['../../parent']"
 [routerLink]="['../sibling']"
 [routerLink]="['./child']"
 [routerLink]="['child']"
* */