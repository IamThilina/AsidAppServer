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
        const url = `${this.API_URL}/search`;
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
