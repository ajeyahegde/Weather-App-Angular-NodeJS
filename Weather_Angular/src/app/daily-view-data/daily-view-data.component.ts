import { Component, OnInit } from '@angular/core';
import { LocationService} from '../location.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-daily-view-data',
  templateUrl: './daily-view-data.component.html',
  styleUrls: ['./daily-view-data.component.css']
})

//Class for Daily View Component of Results
export class DailyViewDataComponent implements OnInit {

  day_weather:any;
  hour_weather:any;
  active = 1;
  location;
  constructor(
    private router:Router,
    private service: LocationService ) { }
    //Get Weather data from Service 
  ngOnInit(): void {
    console.log("In results component");
    console.log(this.service.weather_data_global);
    this.day_weather = this.service.weather_data_global.data.timelines[1].intervals;
    this.hour_weather = this.service.weather_data_global.data.timelines[2].intervals;
    let street = this.service.street_global;
    if(street==undefined)
      street="";
    let state = this.service.state_global;
    let city = this.service.city_global;
    this.location = city+", "+state;
  }
  goToDetails(index){
    
    this.service.index_global = index;  
    this.router.navigate(["/details"]);

  }

  getDetails(){
    this.router.navigate(["/details"]);
  }

}
