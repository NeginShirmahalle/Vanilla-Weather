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
  getForcast(city);
  axios.get(apiURL).then(showTemp);
}
function Handle(event) {
  event.preventDefault();
  let cityinput = document.querySelector("#city-input");
  Search(cityinput.value);
}

function formatDay(timesstamp) {
  let date = new Date(timesstamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayforcast(responce) {
  let dailyforecast = responce.data.daily;
  let forcat = document.querySelector("#forcast");
  let forcasthtml = `<div class="row">`;

  dailyforecast.forEach(function (forcastday, index) {
    if (index < 6) {
      forcasthtml =
        forcasthtml +
        `
              <div class="col-2">
                <div class="daily-forcast-date">${formatDay(
                  forcastday.time
                )}</div>
                <img
                  src="${forcastday.condition.icon_url}"
                  alt="" width="42"
                />
                <div class="daily-forcast-temp">
                  <span class="daily-forcast-max"> ${Math.round(
                    forcastday.temperature.maximum
                  )}°</span>
                  <span class="daily-forcast-min"> ${Math.round(
                    forcastday.temperature.minimum
                  )}°</span>
                </div>
              
            </div>`;
    }
  });

  forcasthtml = forcasthtml + `</div>`;
  forcast.innerHTML = forcasthtml;
}
function getForcast(city) {
  let apikey = "997a3947b24cffe7061o2tbf7136bb8f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiURL).then(displayforcast);
}

let form = document.querySelector("#search");
form.addEventListener("submit", Handle);

Search("Tehran");
