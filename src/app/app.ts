import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'Employees';
}

export const appProviders = [
  importProvidersFrom(HttpClientModule),
  provideRouter(routes)
];
