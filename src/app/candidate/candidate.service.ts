import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()
export class CandidateService {

  private candidateUrl = environment.baseUrl + 'api/candidate';

  constructor(private http: Http) {}

  getCandidate(id) {
    return this.http.get(this.candidateUrl + '/' + id).map(this.extractData).catch(this.handleError);
  }

  getCandidates() {
    return this.http.get(this.candidateUrl).map(this.extractData).catch(this.handleError);
  }

  createCandidate(candidate) {
    return this.http.post(this.candidateUrl, candidate).map(this.extractData).catch(this.handleError);
  }

  updateCandidate(id, candidate) {
    return this.http.patch(this.candidateUrl + '/' + id, candidate).map(this.extractData).catch(this.handleError);
  }

  deleteCandidate(id) {
    return this.http.delete(this.candidateUrl + '/' + id).map(this.extractData).catch(this.handleError);
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
