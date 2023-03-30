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
}

let apiKey = "372b3246a78f090c2oeea103eb8344t0";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Milan&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
