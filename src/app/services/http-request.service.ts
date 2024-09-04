import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private successRate = 0.7;

  constructor() { }

  httpRequest<T>(data: T): Observable<T> {
    return of(null).pipe(
      delay(1000), // Simulate 1 second of network latency
      map(() => {
        if (Math.random() < this.successRate) {
          return data;
        } else {
          throw new Error('Simulated HTTP request failed');
        }
      })
    );
  }
  
}
