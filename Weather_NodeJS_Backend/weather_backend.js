const request = require('request')
const express = require('express')
const cors = require('cors')

//Initializing app to handle requests
const app = express()
//Handle CORS error
app.use(cors())

const tomorrow_url = 'https://api.tomorrow.io/v4/timelines';
var current_weather;
var day_weather;
var hour_weather;
var weather_data;
var cities = [];
var states = [];

//Setting Parameters for tomorrow.io API call
const API_PARAMS = {
    'apikey' : 'pHFfJMuGnh4uGIKWPqMhvIDsUFdkQT5x',
    'timesteps' : ['current','1d','1h'],
    'units' : 'imperial',
    'fields' :  ['temperature', 'temperatureApparent', 'temperatureMin',
        'temperatureMax','windSpeed','windDirection', 'humidity','pressureSeaLevel',
        'uvIndex', 'weatherCode','precipitationProbability','precipitationType', 'sunriseTime',
        'sunsetTime',
        'visibility','moonPhase',  'cloudCover']
 }

/*
Route to get Weather Data(Current, Daily and Horuly) from tomorrow.io API
Request Parameters : Latitude and Longitude
Response: Weather Data in JSON format
*/
 app.get('/weather', (req, res) => {
    var location = req.query.latitude+','+req.query.longitude;
    API_PARAMS['location'] = location;
    request({url:tomorrow_url, qs: API_PARAMS, json:true },(error,response) => {
        if(error){
            console.log("Error");
            return;
        }
        weather_data = response.body;
    })
    res.send(weather_data);    

})

/*
Route to get List of Cities for Auto-complete functionality using Google Places API
Request Parameters : String to filter cities
Response: List of Filtered Cities in JSON format
*/
app.get('/getCities',(req,res)=>{
    var autocompleteurl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    var word = req.query.input;
    var AUTO_PARAMS = {
        'key': 'AIzaSyCS6yPfI8EiGsi6HC3caZMX4zfGiHcFydU',
        'types':'(cities)',
        'input': 'new'
    }
    AUTO_PARAMS['input'] = word;
    request({url:autocompleteurl, qs: AUTO_PARAMS, json:true },(error,response) => {
        if(error){
            console.log("Error");
            return;
        }
        var data = response.body.predictions;
        cities.length = 0;
        states.length = 0;
        for(let i=0;i<data.length;i++)
        {
            cities.push(data[i].structured_formatting.main_text);
            states.push(data[i].terms[1].value);
        }

        res.send({'cities': cities,'states': states});
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is up on port ${PORT}');
    console.log('Press Ctrl+C to QUIT')
})

module.exports = app;
