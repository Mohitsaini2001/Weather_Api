let CityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max"); 
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let  CItySearch = document.querySelector(".weather_search")

let getCountryName =(code)=>{
return new Intl.DisplayNames([code],{type:'region'}).of(code)

};

let getDateTime=(dt)=>{
    
    let curDate = new Date(dt * 1000);
    // console.log(curDate);

    let options ={
        weekdays:'long',
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:'numeric',
        minute:"numeric"
    };
    let formatter = new Intl.DateTimeFormat('en-Us',options);
    return formatter.format(curDate)
} 


let city ='Bulandshahr'

CItySearch.addEventListener("submit",(e)=>{
    e.preventDefault()
    let CityName = document.querySelector(".city_name")
    // console.log(CityName.value);
    city = CityName.value;
    getWeatherData()
    CityName.value = ""
})
let  getWeatherData= async()=>{
  
    try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=cced7d00000f210a929c64feebcdeb2c`)
        // console.log(result);
        let data = await result.json();
        // console.log(data);
        let {main,name,weather,wind,sys,dt} = data
        CityName.innerHTML =` ${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML =getDateTime(dt)
        w_temperature.innerHTML =`${main.temp}&#176`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`
        w_feelsLike.innerHTML =`${main.feels_like.toFixed(2)}&#176`
        w_humidity.innerHTML = `${main.humidity}%`
        w_wind.innerHTML = `${wind.speed} m/s`
        w_pressure.innerHTML = `${main.pressure} hpa`;
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/> `;


    } catch (error) {
       console.log(error); 
    }

}


document.body.addEventListener("load",getWeatherData());