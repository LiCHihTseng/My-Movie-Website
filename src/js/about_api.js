const baseURL = "https://api.open-meteo.com/v1/forecast"

const queryParams = {
    latitude: -27.4679,
    longitude: 153.0281,
    current_weather: true,
};


//convert the query parameters object into query string
const queryString = new URLSearchParams(queryParams).toString();


//
const urlWithParams = baseURL+"?"+queryString;

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
}

//making fetch call
fetch(urlWithParams, requestOptions)
    .then(respone => respone.json())
    .then(data => {
        const weather = data.current_weather;
        console.log("Current temperature " + weather.temperature + "C");
        const temperature_element = document.getElementById("current_temperature");
        const windspeed_element = document.getElementById("current_windspeed") ;
        temperature_element.innerText = weather.temperature + "C";
        windspeed_element.innerText = weather.windspeed + "kph";

    })
    .catch(error => console.log('error', error))