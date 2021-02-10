function getCurrentWeather(response) {
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
  let formatedDateTime = formatDateTime(response.data.dt);
  let dateTimeElement = document.querySelector("#date-time");
  dateTimeElement.innerHTML = formatedDateTime;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  let apiIcon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${apiIcon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
  celsiusFeelsLike = response.data.main.feels_like;
  celsiusHighTemperature = response.data.main.temp_max;
  celsiusLowTemperature = response.data.main.temp_min;

  //forecast api call
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "77284b6440cc462afb48cef654bc731c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
function formatDateTime(dt) {
  let dateTime = new Date(dt * 1000);
  let month = dateTime.getMonth();
  let date = dateTime.getDate();
  let year = dateTime.getFullYear();
  let day = dateTime.getDay();
  let hour = dateTime.getHours();
  let minutes = dateTime.getMinutes();

  let allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (date < 10) {
    date = `0${date}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateAndTime = `${allMonths[month]} ${date} ${year}, ${allDays[day]}, ${hour}:${minutes} CST`;
  return dateAndTime;
}

function getCityInput(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  searchCity(searchElement.value);
}

function searchCity(city) {
  let apiKey = "77284b6440cc462afb48cef654bc731c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentWeather).catch(errorhandling);
}

function errorhandling() {
  alert("Please enter a valild city name");
}

function locationButtonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "77284b6440cc462afb48cef654bc731c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getCurrentWeather);
}

function fahrenheitConversion(event) {
  event.preventDefault();
  let fahrenheitTemperatue = celsiusTemperature * (9 / 5) + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperatue);
  let fahrenheitFeelsLike = celsiusFeelsLike * (9 / 5) + 32;
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(fahrenheitFeelsLike);
  let fahrenheitHighTemperature = celsiusHighTemperature * (9 / 5) + 32;
  let highTempElement = document.querySelector("#tempHigh");
  highTempElement.innerHTML = Math.round(fahrenheitHighTemperature);
  let fahrenheitLowTemperature = celsiusLowTemperature * (9 / 5) + 32;
  let lowTempElement = document.querySelector("#tempLow");
  lowTempElement.innerHTML = Math.round(fahrenheitLowTemperature);

  fahrrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
}

function celsiusConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(celsiusFeelsLike);
  let highTempElement = document.querySelector("#tempHigh");
  highTempElement.innerHTML = Math.round(celsiusHighTemperature);
  let lowTempElement = document.querySelector("#tempLow");
  lowTempElement.innerHTML = Math.round(celsiusLowTemperature);

  celsiusElement.classList.add("active");
  fahrrenheitElement.classList.remove("active");
}

function getForecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return allDays[day];
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;
  for (i = 0; i < 6; i++) {
    forecast = response.data.daily[i];
    let forecastDay = getForecastDays(forecast.dt);
    forecastElement.innerHTML += `
  <div class="col-2 col-sm-2 mb-3 mb-sm-0 eachDayForecast">
    <h6 id="forecastDay">${forecastDay}</h6>
    <img src="images/${
      forecast.weather[0].icon
    }.png" alt="" class="forecastIcon" />
    <h6>${Math.round(forecast.temp.max)}º/${Math.round(
      forecast.temp.min
    )}ºC</h6>
  </div>
  `;
  }
}

let celsiusTemperature = null;
let celsiusFeelsLike = null;
let celsiusHighTemperature = null;
let celsiusLowTemperature = null;

let form = document.querySelector("#search");
form.addEventListener("submit", getCityInput);

let locationElement = document.querySelector("#location-button");
locationElement.addEventListener("click", locationButtonClick);

let fahrrenheitElement = document.querySelector("#fahenheit-link");
fahrrenheitElement.addEventListener("click", fahrenheitConversion);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", celsiusConversion);

searchCity("Minnesota");
