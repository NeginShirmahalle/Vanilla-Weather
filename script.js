function showTemp(responce) {
  celsius = responce.data.temperature.current;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsius);
  let city = document.querySelector("#city");
  city.innerHTML = responce.data.city;
  let Descriptionelement = document.querySelector("#Description");
  Descriptionelement.innerHTML = responce.data.condition.description;
  let Humidity = document.querySelector("#Humidity");
  Humidity.innerHTML = responce.data.temperature.humidity;
  let Wind = document.querySelector("#Wind");
  Wind.innerHTML = Math.round(responce.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(responce.data.time * 1000);
  let emoji = document.querySelector("#emoji");
  emoji.setAttribute("src", responce.data.condition.icon_url);
  emoji.setAttribute("alt", responce.data.condition.description);
}
function formatDate(timeStamp) {
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timeStamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day}, ${hour}:${minutes}`;
}
function Search(city) {
  let apikey = "997a3947b24cffe7061o2tbf7136bb8f";

  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&unit=metric`;
  axios.get(apiURL).then(showTemp);
}
function Handle(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  Search(cityinput.value);
}
function showFarenhait(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let farenhaitTemp = (tempElement.innerHTML * 9) / 5 + 32;

  tempElement.innerHTML = Math.round(farenhaitTemp);
}
function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsius);
}
let celsius = null;
let form = document.querySelector("#search");
form.addEventListener("submit", Handle);

let farenhait = document.querySelector("#farenhait");
farenhait.addEventListener("click", showFarenhait);
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsius);
Search("Tehran");
