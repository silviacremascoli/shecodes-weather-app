function backgroundColor() {
  let time = new Date().getHours();
  if (time > 6 && time < 20) {
    document.querySelector("body").classList.add("day");
    document.querySelector("body").classList.remove("night");
  } else {
    document.querySelector("body").classList.add("night");
    document
      .querySelector(".weather-app")
      .classList.add("night-app-background");
    document.querySelector("body").classList.add("night");
    document.querySelector("#github-link").classList.add("night-text");
    document.querySelector("footer").classList.add("night-text");
    document.querySelector("body").classList.remove("day");
  }
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];
  return `${weekDay}, ${hours}:${minutes} (last update)`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = weekDays[date.getDay()];

  return weekDay;
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
        <div class="weather-forecast-info">
            <div class="forecast-day">${formatForecastDay(
              forecastDay.time
            )}</div>
            <img
            src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt=""
            width="42px"
            />
        <div class="forecast-temperature">
            <span class="max-temp">${Math.round(
              forecastDay.temperature.maximum
            )}</span>° /
            <span class="min-temp">${Math.round(
              forecastDay.temperature.minimum
            )}</span>°
        </div>
        </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "372b3246a78f090c2oeea103eb8344t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

function getMyPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "372b3246a78f090c2oeea103eb8344t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyPosition);
}

let locationButton = document.querySelector("#my-location-button");
locationButton.addEventListener("click", getPosition);

function searchCity(city) {
  let apiKey = "372b3246a78f090c2oeea103eb8344t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Milan");
backgroundColor();
