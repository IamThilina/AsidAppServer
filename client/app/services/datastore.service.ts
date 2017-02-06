/**
 * Created by thilina on 1/4/17.
 */
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class DataStoreService {

    // Observable navItem source
    private _navItemSource = new BehaviorSubject<any>(0);
    // Observable navItem stream
    profilesData$ = this._navItemSource.asObservable();
    // service command
    changeProfiles(profiles:any) {
        this._navItemSource.next(profiles);
    }
}