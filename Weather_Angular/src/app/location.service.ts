import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

//Service to call NodeJS backend to get Tomorrow.io Weather Data
//Service to Get Latitude and Longitude data from current location and Address entered 
export class LocationService {

  public city_global: String;
  public street_global: String;
  public state_global: String;
  public latitude_global: any;
  public longitude_global: any;
  public index_global = -1;
  public weather_data_global:any;
  public isFavorite: boolean;
  constructor(private http:HttpClient) { }

  //Function to get Latitude and Longitude values from Address
  getLocation(data){
    let city = data.city;
    let street = data.street;
    let state = data.state;
    this.city_global = data.city;
    this.state_global = data.state;
    let address = street+city+state;
    console.log(address);
    let api_domain = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    let api_key = '&key=AIzaSyCS6yPfI8EiGsi6HC3caZMX4zfGiHcFydU'; 
    
    let geocode_url = api_domain+address+api_key;

    return this.http.get(geocode_url);
    
  }

  //Function to get Coordinates of current Location using IPInfo API
  getCoordinates(){
    let ipinfo_url = 'https://ipinfo.io/json?token=878e96704f64a8';
    return this.http.get(ipinfo_url);
  }

  //Function to get Weather Data from NodeJS backend using Latitude and Longitude
  getWeatherDetails(latitude,longitude){
    let weather_api_url = 'https://weatherapp-nodejs-backend.ue.r.appspot.com/weather?latitude='+latitude+'&longitude='+longitude;
    console.log(weather_api_url);
    console.log("In Location Service-getWeatherDetaisl");
    this.latitude_global = latitude;
    this.longitude_global = longitude;
    this.isFavorite = false;
    return this.http.get(weather_api_url);
  }

  //Function to reset the values
  resetFunction(){
    this.city_global = undefined;
    this.state_global = undefined;
    this.street_global = undefined;
    this.latitude_global = undefined;
    this.longitude_global = undefined;
    this.index_global = -1;
    this.weather_data_global = undefined;
    this.isFavorite = false;
  }

}
