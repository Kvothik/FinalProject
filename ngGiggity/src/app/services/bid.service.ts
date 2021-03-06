import { Bid } from './../models/bid';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  // C o n s t r u c t o r
  constructor(private http: HttpClient, private authSvc: AuthService) { }

  // F i e l d s

  private baseUrl = environment.baseUrl;

  // M e t h o d s

  createBid(bid: Bid, jid: number) {
    console.log(bid);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.authSvc.getCredentials()
      })
    };
    return this.http.post(this.baseUrl + 'api/bids/' + jid, bid, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('In BidSvc create bid');
        })
      );
  }

  getBids(jid: number) {
    console.log(jid);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.authSvc.getCredentials()
      })
    };
    return this.http.get<Bid[]>(this.baseUrl + 'api/bids/' + jid, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('In BidSvc getBids');
        })
      );
  }
  getBidsByBidder() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.authSvc.getCredentials()
      })
    };
    return this.http.get<Bid[]>(this.baseUrl + 'api/bids/bidder', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('In BidSvc getBids');
        })
      );
  }
  updateBid(bid: Bid) {
    console.log(bid);
    console.log(bid.id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.authSvc.getCredentials()
      })
    };
    return this.http.put<Bid>(this.baseUrl + 'api/bids/' + bid.id, bid, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('In BidSvc updateBids');
        })
      );
  }
}
