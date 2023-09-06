const apiKey = "372b3246a78f090c2oeea103eb8344t0";

const backgroundColor = () => {
  const time = new Date().getHours();
  if (time > 6 && time < 20) {
    document.querySelector("body").classList.add("day");
    document.querySelector("body").classList.remove("night");
  } else {
    document.querySelector("body").classList.add("night");
    document.querySelector("body").classList.add("night");
    document.getElementById("github-link").classList.add("night-text");
    document.querySelector("footer").classList.add("night-text");
    document.querySelector("body").classList.remove("day");
  }
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return moment(date).format("dddd, HH:mm");
};

const formatForecastDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return moment(date).format("ddd");
};

const displayForecast = (response) => {
  const dailyForecast = response.data.daily;
  const forecast = document.getElementById("forecast");

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
            width="50px"
            />
        <div class="forecast-temperature">
            <span class="max-temp">${Math.round(
              forecastDay.temperature.maximum
            )}</span>°  
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
};

const getForecast = (coordinates) => {
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  try {
    axios.get(apiUrl).then(displayForecast);
  } catch (error) {
    console.log(error);
  }
};

const showTemperature = (response) => {
  document.getElementById("city").innerHTML = response.data.city;
  document.getElementById("temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.getElementById("humidity").innerHTML =
    response.data.temperature.humidity;
  document.getElementById("wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.getElementById("description").innerHTML =
    response.data.condition.description;
  document.getElementById("date").innerHTML = formatDate(response.data.time);
  document
    .getElementById("icon")
    .setAttribute(
      "src",
      `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .getElementById("icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
};

const form = document.getElementById("search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("search-input");
  searchCity(cityInput.value);
});

const getMyPosition = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  try {
    axios.get(apiUrl).then(showTemperature);
  } catch (error) {
    console.log(error);
  }
};

const locationButton = document.getElementById("my-location-button");
locationButton.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyPosition);
});

const searchCity = (city) => {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  try {
    axios.get(apiUrl).then(showTemperature);
  } catch (error) {
    console.log(error);
  }
};

searchCity("Milan");
backgroundColor();
