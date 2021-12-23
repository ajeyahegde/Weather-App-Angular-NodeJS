import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
//This Service gets the CityList from Auto-Complete API from NodeJS backend for Form AutoComplete
export class CitiesService {

  constructor(private http:HttpClient) { }

  getCities(word){
    let autocomplete_api_url = 'https://weatherapp-nodejs-backend.ue.r.appspot.com/getCities?input='+word;
    return this.http.get(autocomplete_api_url);
  }
}
