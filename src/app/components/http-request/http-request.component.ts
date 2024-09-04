import { Component } from '@angular/core';
import { HttpRequestService } from '../../services/http-request.service';
import { People } from '../../interface/data';

@Component({
  selector: 'app-http-request',
  standalone: true,
  imports: [],
  templateUrl: './http-request.component.html',
  styleUrl: './http-request.component.css'
})
export class HttpRequestComponent {
  loading!: boolean;
  result$!: People[];
  error!: null;
  // httpService: any;

  constructor (
    private httpService: HttpRequestService,
  ) {
    this.makeRequest(); // for development testing
    // this.httpService.request().subscribe(val => console.log(val))
    
  };


  makeRequest() {
    this.loading = true;
    // this.result$ = 'null';
    // this.error = null;

    const data = this.httpService.request();
    data.subscribe({
      next: (data) => {
        // console.log(this.error)
        this.result$ = data;
        this.loading = false;
        // console.log(data);
      },
      error: (err) => {
        console.log(err)
        this.error = err.message;
        this.loading = false;
      }
    });
  }

}
