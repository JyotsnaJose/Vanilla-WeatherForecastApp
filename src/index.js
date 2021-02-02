function getCurrentWeather(response) {
  console.log(response.data);
  let cityNameElement = document.querySelector("#cityName");
  cityNameElement.innerHTML = response.data.name;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let tempHighElement = document.querySelector("#tempHigh");
  tempHighElement.innerHTML = Math.round(response.data.main.temp_max);
  let tempLowElement = document.querySelector("#tempLow");
  tempLowElement.innerHTML = Math.round(response.data.main.temp_min);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
}

let apiKey = "77284b6440cc462afb48cef654bc731c";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(getCurrentWeather);
