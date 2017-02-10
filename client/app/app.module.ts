import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule }    from '@angular/http';

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routing";

import {LandingComponent} from "./pages/landing/landing.component";
import {SearchComponent} from "./pages/search/search.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {SuggestionsComponent} from "./pages/suggestions/suggestions.component";

import {AuthGuard} from "./guards/auth.gaurd";
import {SearchService} from "./services/search.service";
import {DataStoreService} from "./services/datastore.service";

//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    declarations: [AppComponent, LandingComponent, SearchComponent, ProfileComponent, SuggestionsComponent],
    providers: [AuthGuard, SearchService, DataStoreService],
    bootstrap: [AppComponent],
})

export class AppModule { }