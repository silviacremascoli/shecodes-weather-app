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
  let day = weekDays[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.temperature.current);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
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
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
}

function searchCity(city) {
  let apiKey = "372b3246a78f090c2oeea103eb8344t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);

let celsiusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusDegrees.classList.remove("active");
  fahrenheitDegrees.classList.add("active");
  let fahrenheit = Math.round(celsiusTemperature * 1.8 + 32);
  document.querySelector("#temperature").innerHTML = fahrenheit;
}

let fahrenheitDegrees = document.querySelector("#fahrenheit-degrees");
fahrenheitDegrees.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celsiusDegrees.classList.add("active");
  fahrenheitDegrees.classList.remove("active");
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusDegrees = document.querySelector("#celsius-degrees");
celsiusDegrees.addEventListener("click", convertToCelsius);

searchCity("San Francisco");
