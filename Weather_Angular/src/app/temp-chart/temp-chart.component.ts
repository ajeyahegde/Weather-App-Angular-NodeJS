import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
import { LocationService} from '../location.service'

let More = require("highcharts/highcharts-more");
More(Highcharts)
@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.css']
})
//Class to Display Temperature Charts in the Results Tab
export class TempChartComponent implements OnInit {

  day_arr=[];
  xaxis_labels=[];
  datepipe: DatePipe;
  highcharts;
  chartOptions;
  weatherDaysData;
  
  constructor(
    private service:LocationService
  ) {
   }

  ngOnInit(): void {
      console.log("In temp chart");
      let weatherData = this.service.weather_data_global;
      this.weatherDaysData = weatherData.data.timelines[1].intervals;
      let size = this.weatherDaysData.length;
      console.log(size);
      for(let i=0;i<size;i++){
        let temp_date = new Date(this.weatherDaysData[i].startTime).toString().substring(4,10);
        let temp_min = this.weatherDaysData[i].values.temperatureMin;
        let temp_max = this.weatherDaysData[i].values.temperatureMax;
        let temp_arr = [temp_date,temp_min,temp_max];
        this.xaxis_labels.push(temp_date);
        this.day_arr.push(temp_arr);
      }
      console.log(this.day_arr);
      console.log(this.xaxis_labels);
      this.createGraph();
  }
  //Function to create Arearange Chart
  createGraph(){
    this.highcharts = Highcharts;

    this.chartOptions = {   
      chart: {
        type: 'arearange',
        zoomType: 'x',
        scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1
        }
      },
      title: {
         text: 'Temperature Ranges (Min,Max)'
      },
      
      xAxis: {
        type: 'date',
          categories:this.xaxis_labels
      },

      
      yAxis: {          
         title:{
            text:"Temperature °F"
         } 
      },
      
      tooltip: {
        crosshair: true,
        shared: true,
        valueSuffix: '°F',
      },

      plotOptions: {
        series:{
            fillColor:{
                linearGradient: [0,0,0,400],
                stops: [
                    [0, Highcharts.color('#e65c00').setOpacity(1).get('rgba')],
                    [1,'#cce0ff']
                ]
            }
        }
      },

      series: [{
        name: 'Temperatures',
        data: this.day_arr
        
      }]

   };
  }
}
