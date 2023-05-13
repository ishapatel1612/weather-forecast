let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDay = document.querySelector("#day");
weekDay.innerHTML = `${day} ${hours}:${minutes}`;

//Current button

function pressCurrentButton() {
  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey1 = "6c24b098b2bd19340ed515f93a30a1a9";
    let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey1}&units=metric`;
    axios.get(apiUrl1).then(showCurrentTemp);
  }

  function showCurrentTemp(response) {
    let city = response.data.name;
    let temp = Math.round(response.data.main.temp);

    let currentCity = document.querySelector("#city");
    currentCity.innerHTML = `${city}`;
    let currentTemp = document.querySelector("#temp");
    currentTemp.innerHTML = `${temp}`;
  }
}

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", pressCurrentButton);

//Enter city

let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", enterCity);

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  document.getElementById("city").innerHTML = `${cityInput.value}`;

  let userInput = cityInput.value;
  let apiKey2 = `6c24b098b2bd19340ed515f93a30a1a9`;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey2}&units=metric`;

  axios.get(apiUrl2).then(showWeather);
}

function showWeather(response) {
  let cityInputTemp = document.querySelector("#temp");
  cityInputTemp.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `  ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `  ${response.data.wind.speed} km/h`;

  let cityTemp = Math.round(response.data.main.temp);

  let farenheitLink = document.querySelector("#farenheit-link");
  farenheitLink.addEventListener("click", showFarenheit);

  function showFarenheit(event) {
    event.preventDefault();
    let temp = document.querySelector("#temp");
    let farenheitTemp = (cityTemp * 9) / 5 + 32;
    temp.innerHTML = Math.round(farenheitTemp);
  }

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", showCelcius);

  function showCelcius(event) {
    event.preventDefault();
    let temp = document.querySelector("#temp");
    let celciusTemp = cityTemp;
    temp.innerHTML = celciusTemp;
  }
}
