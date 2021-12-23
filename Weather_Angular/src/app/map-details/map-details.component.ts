import { Component, OnInit } from '@angular/core';
import { Loader} from '@googlemaps/js-api-loader'
import { LocationService} from '../location.service'

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css']
})
//Class to display Google Map Details in the Details Page
export class MapDetailsComponent implements OnInit {

  constructor(
    private service:LocationService
  ) { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey:'AIzaSyCS6yPfI8EiGsi6HC3caZMX4zfGiHcFydU'
  })

  loader.load().then(()=> {
      const map = new google.maps.Map(document.getElementById("maps"), {
          center: {lat:parseFloat(this.service.latitude_global), lng:parseFloat(this.service.longitude_global)},
          zoom:12
      })

      const marker = new google.maps.Marker({
          position: {lat:parseFloat(this.service.latitude_global), lng:parseFloat(this.service.longitude_global)},
          map: map
        });
  })
}
}
