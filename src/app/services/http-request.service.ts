import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, retry, scan, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { People } from '../interface/data';
// import data from '../../assets/data/data'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private successRate = 0.7;
  private maxTries = 1;
  private attempt = 0;
  private people = [
    {"name": "Mary", "gender": "female"},
    {"name": "Evelyn", "gender": "female"},
    {"name": "Caleb", "gender": "male"},
    {"name": "Grace", "gender": "female"},
    {"name": "Ines", "gender": "female"},
    {"name": "Gerard", "gender": "male"},
    {"name": "Ajeyi", "gender": "female"}
]


  constructor(
    private http: HttpClient,
  ) {  }

  private httpRequest<T>(data: T): Observable<T> {
    return of(null).pipe(
      delay(1000), 
      tap(() => console.log('initial call to api')),
      scan((attempts: number) => attempts + 1, 0),
      map(() => {
        if (Math.random() < this.successRate) {
          console.log('number of tries before success: ', this.attempt);
          this.attempt = 0;
          return data;
        } else {
          this.attempt++;
          throw new Error('Failed to fetch data');
        }
      }),
      tap(data => {
        console.log('on success response: ', data)
      }),
      retry(this.maxTries),  
      tap(() => {
        // this.attempt++;
        // console.log(this.attempt);
        console.log('after max tries: ', data)
      }),
    catchError(error => {
      console.log('number of tries before error: ', this.attempt);
      console.error('Request failed:', error);
      throw new Error('failed to fetch data, kindly contact admin via www.amalitechtraining.org')
    })

    );
  }

  request () {
    return this.httpRequest(this.people)
  }
  
}
