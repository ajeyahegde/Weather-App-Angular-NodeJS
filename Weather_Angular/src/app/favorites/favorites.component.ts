import { Component, OnInit } from '@angular/core';
import { LocationService} from '../location.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

//Class for Favorites Component of the App
export class FavoritesComponent implements OnInit {

  constructor(
    private location: LocationService,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.getFavoritesData()
  }

    localStorageData: any
    containsData:boolean
    weather_data;

    //Function to get Data from Local Storage
    getFavoritesData() {
        this.localStorageData = JSON.parse(localStorage.getItem("favoritesData"));
        console.log("In favorites component");
        console.log(this.localStorageData);
        if (this.localStorageData==null || Object.keys(this.localStorageData).length==0 ||this.localStorageData==undefined){
            this.containsData=false;
        }
        else{
            this.containsData=true;
        }

    }
    //Function to delete Data in the Local Storage
    removeData(index:any) {

        this.localStorageData = JSON.parse(localStorage.getItem("favoritesData"))
        localStorage.removeItem('favoritesData');
        console.log("removed data from favourites")
        var i=index;
        console.log(index);
        console.log(this.localStorageData);
       

        this.localStorageData.splice(i, 1);
        localStorage.setItem('favoritesData',JSON.stringify(this.localStorageData));
        console.log(this.localStorageData);
        this.getFavoritesData()

    }

    goToResults(index){
      this.localStorageData = JSON.parse(localStorage.getItem("favoritesData"));
      let data = this.localStorageData[index];
      let lat = data.lat;
      let lng = data.lng;
      console.log(lat+" "+lng);
      this.location.city_global = data.city;
      this.location.state_global = data.state;
      this.location.index_global = -1;
      this.location.isFavorite = true;
      this.location.getWeatherDetails(lat,lng).subscribe( results =>{
        let weatherString = JSON.stringify(results);
        this.weather_data = JSON.parse(weatherString);
        this.location.weather_data_global = this.weather_data;
        setTimeout(() => {
          this.router.navigate(['results']);
        },
        1000);
      })
    }
}
