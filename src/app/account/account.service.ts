import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

    private accountUrl = environment.baseUrl + 'api/account/';

    constructor(private http: Http) { }

    register(account) {
        return this.http.post(this.accountUrl + 'register', account).map(this.extractData).catch(this.handleError);
    }

    activate(token) {
        return this.http.post(this.accountUrl + 'activate/' + token, {}).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
