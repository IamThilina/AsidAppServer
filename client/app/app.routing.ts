/**
 * Created by thilina on 12/13/16.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component";

import {LandingComponent} from "./pages/landing/landing.component";
import {SearchComponent} from "./pages/search/search.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SuggestionsComponent} from "./pages/suggestions/suggestions.component";

import {AuthGuard} from "./guards/auth.gaurd";

const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'find', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'profile/:name/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'suggestions/:name', component: SuggestionsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo:'', pathMatch: 'full' }
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