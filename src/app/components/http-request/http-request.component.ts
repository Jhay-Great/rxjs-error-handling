import { Component } from '@angular/core';
import { HttpRequestService } from '../../services/http-request.service';

@Component({
  selector: 'app-http-request',
  standalone: true,
  imports: [],
  templateUrl: './http-request.component.html',
  styleUrl: './http-request.component.css'
})
export class HttpRequestComponent {
  loading!: boolean;
  result!: string;
  error!: null;
  // httpService: any;

  constructor (
    private httpService: HttpRequestService,
  ) {};


  makeRequest() {
    this.loading = true;
    // this.result = 'null';
    // this.error = null;

    this.httpService.httpRequest('Sample Data').subscribe({
      next: (data) => {
        this.result = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

}
