let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-date-time");
let w_icon = document.querySelector(".weather-icon");
let w_forecast = document.querySelector(".weather-forecast");
let w_temperature = document.querySelector(".weather-temperature");
let w_minTem = document.querySelector(".weather-min");
let w_maxTem = document.querySelector(".weather-max");

let w_feelsLike = document.querySelector(".weather-feels-like");
let w_humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let w_pressure = document.querySelector(".weather-pressure");

let citySearch = document.querySelector(".weather-search"); 





const getCountryCode = (code) => {
    return new Intl.DisplayNames([code],{type: `region`}).of(code);
}

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    //   second: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(curDate);
    return formattedDate;
}



let city = "Surat";


citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city-name");
    
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})


const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=89c59c4e738a8d0a0ab014421ad3d112`;
    try{
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        // console.log(data);
        const {main, name, weather,sys, wind,dt} = data;

        cityName.innerHTML = `${name}, ${getCountryCode(sys.country)}`;

        dateTime.innerHTML = getDateTime(dt);


        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="https://openweathermap.org/img/w/${weather[0].icon}.png" alt="Weather Icon" style="width: 50px; height: 50px;"  >`;


        w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176`;

        w_minTem.innerHTML = `Min: ${ (main.temp_min - 273.15).toFixed(2) }&#176`;
        w_maxTem.innerHTML = `Max: ${ (main.temp_max - 273.15).toFixed(2) }&#176`;


        w_feelsLike.innerHTML = `Feels Like: ${(main.feels_like - 273.15).toFixed(2)}&#176`;
        w_humidity.innerHTML = `Humidity: ${main.humidity}%`;
        w_wind.innerHTML = `Wind Speed: ${wind.speed} m/s`;
        w_pressure.innerHTML = `Pressure: ${main.pressure} hPa`;
        


    }catch(error){
        console.log(error);
    }
};

document.body.addEventListener("load", getWeatherData());
 