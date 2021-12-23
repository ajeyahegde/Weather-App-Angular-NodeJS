import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router} from '@angular/router'
import { state,trigger,transition,query,animate,group,style } from '@angular/animations';
import { LocationService} from '../location.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  
})

/*Class to Display Results Component of the APP
  Main Functionalities:
  Get Weather Data through Service
  NavBar to Navigate between Results and HighCharts
  Save Favorite to Local Storage if Checked 
*/
export class ResultsComponent implements OnInit {

  @Input() weatherJSON;
  day_weather:any;
  hour_weather:any;
  active = 1;
  isFavoriteChecked;
  location;
  currentIndex;
  hasData = true;

  
  datepipe: DatePipe;
  constructor(
    private router:Router,
    private service: LocationService 
    ) { 
    
  }

  ngOnInit(): void {
    this.isFavoriteChecked = this.service.isFavorite;
    this.currentIndex = this.service.index_global;
    console.log(this.service.weather_data_global);
    if(this.service.weather_data_global==null||this.service.weather_data_global==undefined)
        this.hasData = false;
    this.day_weather = this.service.weather_data_global.data.timelines[1].intervals;
    this.hour_weather = this.service.weather_data_global.data.timelines[2].intervals;
    let street = this.service.street_global;
    if(street==undefined)
      street="";
    let state = this.service.state_global;
    let city = this.service.city_global;
    if(state==null)
        state=city;
    this.location = city+", "+state;

  }

  goToDetails(index){
    
    this.service.index_global = index;  
    this.router.navigate(["/details"]);

  }

  getDetails(){
    this.router.navigate(["/details"]);
  }


  saveDatatoLocalStorage(){
    let lat = this.service.latitude_global;
    let lng = this.service.longitude_global;
    let city = this.service.city_global;
    let state = this.service.state_global;
    let exist = false;
    let currentData = {
      'lat': lat,
      'lng': lng,
      'city': city,
      'state': state
    } 

    if(this.isFavoriteChecked == false){
        this.isFavoriteChecked = true;
    }else{
      this.isFavoriteChecked = false;
    }

    this.service.isFavorite = this.isFavoriteChecked;
    if(this.isFavoriteChecked == true){
       var localStorageData = JSON.parse(localStorage.getItem("favoritesData"));
       if(localStorageData==null || localStorageData== undefined){
        localStorage.setItem("favoritesData", JSON.stringify([currentData]));
        return;
      }
      for (let i = 0; i < Object.keys(localStorageData).length; i++) {
        if (JSON.stringify(currentData) === JSON.stringify(localStorageData[i])) {
          exist = true;
          break;
        }
      }

      if(exist == false){
        localStorageData.push(currentData);
        localStorage.setItem("favoritesData", JSON.stringify(localStorageData));
      }
    }else{
      var localStorageData = JSON.parse(localStorage.getItem("favoritesData"));
      localStorage.removeItem('favoritesData');
      var i=0;
      for(;i<Object.keys(localStorageData).length;i++){
        if(JSON.stringify(currentData)===JSON.stringify(localStorageData[i]))
          break;
      }
      localStorageData.splice(i,1);
      localStorage.setItem('favoritesData',JSON.stringify(localStorageData));
    }

  }

}
