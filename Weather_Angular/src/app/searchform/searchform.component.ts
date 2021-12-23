import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { LocationService} from '../location.service'
import { FormsModule} from '@angular/forms' 
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { CitiesService} from '../cities.service';
import { Observable} from 'rxjs';
import { startWith, map} from 'rxjs/operators';
import { Router} from '@angular/router'

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
/*Class for Form Component
  Functionalities Include:
  Initialize Form Values
  Call to service to get Weather Data after Form submit
  Option to RESET form
*/
export class SearchformComponent implements OnInit {
  form: FormGroup;
  city = "";
  street = "";
  state = "";
  hasData = true;
  longitude: String;
  latitude: String;
  loc_data: any;
  weather_data: any;
  cities: string[] = [];
  states: string[] = [];
  filteredCities: Observable<string[]>;
  showProgressBar = false;

  @Output() sendWeatherData:EventEmitter<any> = new EventEmitter()
  constructor(
    private location: LocationService,
    private cityService: CitiesService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.cities = [''];
    this.form = new FormGroup({
      street: new FormControl('', Validators.compose([
        Validators.required
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required
      ])),
      state: new FormControl('California'),
      checklocation: new FormControl()
    });

    this.form.get('checklocation').valueChanges.subscribe(v=>{
      if(v){
        this.form.get('street').disable();
        this.form.get('city').disable();
        this.form.get('state').disable();
        this.form.get('street').setValue('');
        this.form.get('city').setValue('');
        this.form.get('state').setValue('');
      }
      else{
        this.form.get('street').enable();
        this.form.get('city').enable();
        this.form.get('state').enable();
      }
    })

    this.form.get('city').valueChanges.subscribe(city=>{
      this.cityService.getCities(city).subscribe( data =>{
        let cityDataString = JSON.stringify(data);
        let cityData = JSON.parse(cityDataString);
        this.cities = cityData.cities;
        this.states = cityData.states;

      })
    })
    this.filteredCities = this.form.get('city').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    )
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.cities.filter(city => this._normalizeValue(city).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    if(value==null)
      return '';
    return value.toLowerCase().replace(/\s/g, '');
  }
  
  reset(){
    this.location.resetFunction();
    this.form.get('state').setValue('California');
    this.form.reset();
    this.router.navigate([""]);
  }

  getCity(city){
    this.city = city;
  }
  getStreet(street){
    this.street = street;
  }
  getState(state){
    this.state = state;
  }
  getValues(data){
    this.showProgressBar = true;
    if(data.checklocation == true){
      this.location.getCoordinates().subscribe( data=> {
        let coordinates_string = JSON.stringify(data);
        let coordinates = JSON.parse(coordinates_string);
        let location = coordinates.loc.split(",");
        let lat = location[0];
        let lng = location[1];
        this.location.state_global = coordinates.region;
        this.location.city_global = coordinates.city;
        
        this.location.getWeatherDetails(lat,lng).subscribe( results =>{
          let weatherString = JSON.stringify(results);
          this.weather_data = JSON.parse(weatherString);
          this.location.weather_data_global = this.weather_data;
          setTimeout(() => {
            this.showProgressBar = false;    
            this.router.navigate(['results']);
          },
          3000);
          
        })
         
      })
    }
    else{
    this.location.getLocation(data).subscribe( results => {
      this.loc_data = JSON.stringify(results);
      let data = JSON.parse (this.loc_data);
      console.log(this.loc_data);
      let lat = data.results[0].geometry.location.lat;
      let lng = data.results[0].geometry.location.lng;
      console.log(lat+" "+lng);
      this.location.getWeatherDetails(lat,lng).subscribe( results =>{
        let weatherString = JSON.stringify(results);
        this.weather_data = JSON.parse(weatherString);
        console.log(this.weather_data);
        this.location.weather_data_global = this.weather_data;
        
       setTimeout(() => {
        this.showProgressBar = false;    
        this.router.navigate(['results']);
      },
      3000);
      
      })
     
    });
    }
    
  }

}
