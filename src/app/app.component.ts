import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpRequestComponent } from './components/http-request/http-request.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpRequestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-error-handling';
}
