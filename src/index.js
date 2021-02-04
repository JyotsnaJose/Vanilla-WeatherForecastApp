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
  let formatedDateTime = formatDateTime(response.data.dt);
  let dateTimeElement = document.querySelector("#date-time");
  dateTimeElement.innerHTML = formatedDateTime;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  let apiIcon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${apiIcon}.png`);
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
  if (searchElement.value !== "") {
    searchCity(searchElement.value);
  } else {
    searchCity("Minnesota");
  }
}
function searchCity(city) {
  let apiKey = "77284b6440cc462afb48cef654bc731c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentWeather);
}

searchCity("Minnesota");

let form = document.querySelector("#search");
form.addEventListener("submit", getCityInput);
