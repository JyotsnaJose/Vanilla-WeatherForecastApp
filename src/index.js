function getCurrentWeather(response) {
  console.log(response);
}

let apiKey = "77284b6440cc462afb48cef654bc731c";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(getCurrentWeather);
