/**
 * Created by thilina on 12/17/16.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,RouterStateSnapshot,} from '@angular/router';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private http: Http, private router: Router) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private authorizingUrl = '/api/verify';
    private logoutUrl = '/user/logout';
    private authorized = false;
    private userRole: string;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Promise<boolean> {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(this.authorizingUrl, {headers: this.headers})
                .toPromise()
                .then(response => {
                    //noinspection TypeScriptUnresolvedFunction
                    this.userRole =  response.json().role;
                    if(this.userRole == "PUBLIC") {
                        this.authorized = true;
                        resolve(true);
                    }
                    if(!this.authorized) {
                        resolve(false);
                        this.router.navigate(['']);
                    }
                }, error => {
                    console.log(error.json());
                    resolve(false);
                    this.router.navigate(['']);
                })
                .catch((err) => {
                    //console.log(err);
                    resolve(false);
                    this.router.navigate(['']);
                })
        })
    }

}