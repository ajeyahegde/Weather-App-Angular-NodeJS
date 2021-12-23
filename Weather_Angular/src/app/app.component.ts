import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Main App component to initialize the Home Page with Search Form
export class AppComponent {
  title = 'weather-angular-app';
  weatherData: any;
  day_weather:any;
  hour_weather:any;
  display = false;
  constructor(private router: Router) {}
  
  ngOnInit() {
    this.router.navigate(['']);
  }
}
