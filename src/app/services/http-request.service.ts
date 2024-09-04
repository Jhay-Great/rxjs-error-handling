import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { People } from '../interface/data';
// import data from '../../assets/data/data'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private successRate = 0.7;
  private numberOfTries = 3;
  private people = [
    {"name": "Mary", "gender": "female"},
    {"name": "Evelyn", "gender": "female"},
    {"name": "Caleb", "gender": "male"},
    {"name": "Grace", "gender": "female"},
    {"name": "Ines", "gender": "female"},
    {"name": "Gerard", "gender": "male"},
    {"name": "Ajeyi", "gender": "female"}
]

  // apiUrl:string = '../../assets/data/data.json'
  // private jsonUrl = 'assets/data.json';

  constructor(
    private http: HttpClient,
  ) { 
    // console.log(this.apiUrl);
    // console.log(`${this.apiUrl}`)
   }

  private httpRequest<T>(data: T): Observable<T> {
    return of(null).pipe(
      delay(1000), // Simulate 1 second of network latency
      map(() => {
        if (Math.random() < this.successRate) {
          // return this.http.get(`${this.apiUrl}`);
          return data;
        } else {
          // retry(this.numberOfTries);
          throw new Error('Failed to fetch data');
        }
      }),
      retry(this.numberOfTries), // Retry mechanism
    catchError(error => {
      console.error('Request failed:', error);
      throw new Error('failed to fetch data, kindly contact admin via www.amalitechtraining.org')
      // return of(data); // Provide fallback data if all retries fail
    })

    );
  }

  request () {
    return this.httpRequest(this.people)
  }
  
}
