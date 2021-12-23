import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { LocationService} from '../location.service'

let More = require("highcharts/highcharts-more");
let Windbarb =require('highcharts/modules/windbarb.js');
More(Highcharts);
Windbarb(Highcharts);

@Component({
  selector: 'app-meteogram-chart',
  templateUrl: './meteogram-chart.component.html',
  styleUrls: ['./meteogram-chart.component.css']
})

//Class to display Meteogram HighChart in the results Page
export class MeteogramChartComponent implements OnInit {

  highcharts;
  chartOptions;
  weatherHoursData;
  hour_pressures=[];
  hour_temperatures=[];
  hour_humidities=[];
  hour_windDirections=[];

  constructor(
    private service:LocationService
  ) { }

  ngOnInit(): void {
    //Get Data in INIT Method
    let weatherData = this.service.weather_data_global;
    this.weatherHoursData = weatherData.data.timelines[2].intervals;
    let nums = this.weatherHoursData.length;
    for(let i=0;i<nums;i=i+3){
      let hour_values = this.weatherHoursData[i].values;
      const dateToday = new Date(this.weatherHoursData[i].startTime);
      let x = Date.parse(dateToday.toString());
      let hour_pressure= [ x, hour_values.pressureSeaLevel];
      let hour_temperature= [ x, hour_values.temperature];
      let hour_humidity=[x, hour_values.humidity];
      let hour_windSpeed = hour_values.windSpeed;
      let hour_windDirection = {"x":x, "value": hour_windSpeed,"direction":hour_values.windDirection};
      this.hour_pressures.push(hour_pressure);
      this.hour_temperatures.push(hour_temperature);
      this.hour_humidities.push(hour_humidity);
      this.hour_windDirections.push(hour_windDirection);
    }
    this.createMeteogramChart();
  }
  //Function to create the charts and assign characteristics
  createMeteogramChart(){
    this.highcharts = Highcharts;
    //Chart code start here
    this.chartOptions = {
      chart: {
      marginBottom: 70,
      marginRight: 40,
      marginTop: 50,
      plotBorderWidth: 1,
      height: 500,
      alignTicks: false,
      scrollablePlotArea: {
          minWidth: 720,
      }
  },
  //Title
  title: {
  text: 'Hourly Weather (For Next 5 Days)',
  align: 'center',
  style: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
      }
  },

  tooltip: {
  shared: true,
  useHTML: true,
  headerFormat:
      '<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
      '<b>{point.point.symbolName}</b><br>'

  },
  xAxis: [{ // Bottom X axis
  type: 'datetime',
  tickInterval: 4 * 36e5, // four hours
  tickLength: 0,
  gridLineWidth: 1,
  gridLineColor: 'rgba(128, 128, 128, 0.1)',
  startOnTick: false,
  endOnTick: false,
  minPadding: 0,
  maxPadding: 0,
  offset: 30,
  showLastLabel: true,
  labels: {
      format: '{value:%H}'
  },
  crosshair: true
}, { // Top X axis
  linkedTo: 0,
  type: 'datetime',
  tickInterval: 24 * 3600 * 1000,
  labels: {
      format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
      align: 'left',
      x: 3,
      y: -5
  },
  opposite: true,
  tickLength: 20,
  gridLineWidth: 1
}],

  yAxis:[{ // temperature axis
    title: {
      text: null
    },
    labels: {
      format: '{value}°F',
      style: {
        fontSize: '10px'
      },
      x: -3
    },
    plotLines: [{ // zero plane
      value: 0,
      color: '#BBBBBB',
      width: 1,
      zIndex: 2
    }],
    maxPadding: 0.3,
    minRange: 8,
    tickInterval: 1,
    gridLineColor: 'rgba(128, 128, 128, 0.1)'

  }, {
    title: {
      text: null
    },
    labels: {
      enabled: true
    },
    gridLineWidth: 0,
    tickLength: 0,
    minRange: 10,
    min: 0

  }, { // Air pressure
    allowDecimals: false,
    title: { // Title on top of axis
      text: 'hPa',
      offset: 0,
      align: 'high',
      rotation: 0,
      style: {
        fontSize: '10px',
      },
      textAlign: 'left',
      x: 3
    },
    labels: {
      style: {
        fontSize: '8px',
        color: Highcharts.getOptions().colors[2]
      },
      y: 2,
      x: 3
    },
    gridLineWidth: 0,
    opposite: true,
    showLastLabel: false
  }],

  legend: {
      enabled: false
  },

  plotOptions: {
  series: {
      pointPlacement: 'between'
  }
  },
  series: [{
  name: 'Temperature',
  type: 'spline',
  data: this.hour_temperatures,
  marker: {
      enabled: false,
      states: {
          hover: {
              enabled: true
          }
      }
  },
  tooltip: {
      pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
          '{series.name}: <b>{point.y}°F</b><br/>'
  },
  zIndex: 1,
  color: '#FF3333',
  negativeColor: '#48AFE8'
},  {
  name: 'Humidity',
  type: 'column',
  data: this.hour_humidities,
  yAxis: 1,
  grouping: false,
  dataLabels: {
      enabled: true,
      filter: {
          operator: '>',
          property: 'y',
          value: 0
      },
  },
  tooltip: {
      valueSuffix: ' %'
  }
}, {
  name: 'Air Pressure',
  color: 'orange',
  data: this.hour_pressures,
  marker: {
      enabled: false
  },
  shadow: false,
  tooltip: {
      valueSuffix: ' inHg'
  },
  dashStyle: 'shortdot',
  yAxis: 2
}, {
  name: 'Wind',
  type: 'windbarb',
  id: 'windbarbs',
  color: Highcharts.getOptions().colors[1],
  lineWidth: 1.5,
  data: this.hour_windDirections,
  vectorLength: 18,
  yOffset: -15,
  tooltip: {
      valueSuffix: ' m/s'
  }
  }]
  };
    //////
  }
}
