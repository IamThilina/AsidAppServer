/**
 * Created by thilina on 1/4/17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

    constructor(private http: Http) { }

    private API_URL = 'api';

    search(user: FormData): Promise<any> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.API_URL}/find`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({user: user}), {headers: headers})
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    authorizePublicUser(): Promise<any> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.API_URL}/authorize/public`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, {headers: headers})
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    authorizePrivilegedUser(user: FormData): Promise<any> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.API_URL}/authorize/privileged`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({user: user}), {headers: headers})
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}
