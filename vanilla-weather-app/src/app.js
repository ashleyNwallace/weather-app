function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hoours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "5723740d8d0f3d5046687fbab7668982";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  tempC = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = tempC;
  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidityElement");
  humidity.innerHTML = response.data.main.humidity;
  let dateElement = document.querySelector("#dateElement");
  dateElement.innerHTML = displayDate(response.data.dt * 1000);
  let iconDisplay = document.querySelector("#icon");
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function farenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#currentTemp").innerHTML = Math.round(
    (tempC * 9) / 5 + 32
  );
}

function celsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#currentTemp").innerHTML = tempC;
}

function displayForecast(response) {
  let predictedForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  predictedForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                  <div class="weather-forecast-day">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="100%"
                    class="weather-forecast-img"
                  />
                  <div class="weather-forecast-temperature">
                    <span class="weather-forecast-min">${Math.round(
                      forecastDay.temp.min
                    )}º</span>
                    <span class="weather-forecast-max">${Math.round(
                      forecastDay.temp.max
                    )}º </span>
                  </div>
                </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>;`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "5723740d8d0f3d5046687fbab7668982";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityElement");
  search(cityElement.value);
}

let tempC = null;
document
  .querySelector("#farenheitTemp")
  .addEventListener("click", farenheitTemp);
document.querySelector("#celsiusTemp").addEventListener("click", celsiusTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Madrid");
