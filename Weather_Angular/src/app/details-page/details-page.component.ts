import { Component, OnInit } from '@angular/core';
import { LocationService} from '../location.service';
import { Router} from '@angular/router'


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})

//Class for Details Page: To Display Day Weather Data and Maps
export class DetailsPageComponent implements OnInit {
  currentData;
  currentDate;
  twitterText;
  constructor(
    private service:LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Map Weather Codes and Status
    var weather_codes = {
      "1000": "Clear",
      "1001": "Cloudy",
      "1100": "Mostly Clear",
      "1101": "Partly Cloudy",
      "1102": "Mostly Cloudy",
      "2000": "Fog",
      "2100": "Light Fog",
      "3000": "Light Wind",
      "3001": "Wind",
      "3002": "Strong Wind",
      "4000": "Drizzle",
      "4001": "Rain",
      "4200": "Light Rain",
      "4201": "Heavy Rain",
      "5000": "Snow",
      "5001": "Flurries",
      "5100": "Light Snow",
      "5101": "Heavy Snow",
      "6000": "Freezing Drizzle",
      "6001": "Freezing Rain",
      "6200": "Light Freezing Rain",
      "6201": "Heavy Freezing Rain",
      "7000": "Ice Pellets",
      "7101": "Heavy Ice Pellets",
      "7102": "Light Ice Pellets",
      "8000": "Thunderstorm"

    };
    let weatherData = this.service.weather_data_global;
    console.log(weatherData);
    let day_data = weatherData.data.timelines[1].intervals;
    let index = parseInt(this.service.index_global.toString());
    console.log(index);
    let current_data = day_data[index];
    this.currentData = current_data.values;
    this.currentDate = current_data.startTime;
    console.log(this.currentData);
    let location = this.service.city_global+" "+this.service.state_global;
    this.twitterText = "The temperature in "+ location + " on "+ new Date(this.currentDate) +" is " +this.currentData.temperatureMax +". The weather conditions are "+weather_codes[this.currentData.weatherCode] + "&hashtags=CSCI571WeatherForecast";
    console.log(this.twitterText);
  }

  //Navigate to Results
  goToList(){
    this.router.navigate(["/results"]);
  }

  //Function to open Twitter
  openTwitter(){
    console.log("In openTwitter function");
    let url = "https://twitter.com/intent/tweet?text="+this.twitterText;
    window.open(url,'_blank');
  }


}
