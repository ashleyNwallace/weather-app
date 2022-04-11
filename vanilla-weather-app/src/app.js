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

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Denver");
