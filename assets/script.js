var searchInput = document.querySelector(".inputValue");
var searchBtn = document.querySelector(".searchBtn");
var currentDate = moment();
var cityDateIcon = document.querySelector(".city-date-icon");
var weatherIcon = document.querySelector(".weather-icon");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvi = document.querySelector(".uvi");

var searchSubmitHandler = function (event) {
  event.preventDefault;

  var city = searchInput.value.trim();

  if (city) {
    getCityWeather(city);

    searchInput.value = "";
  } else {
    alert("Please enter a city");
  }
};

searchBtn.addEventListener("click", async function () {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput.value +
    "&units=imperial&appid=9795009f60d5d1c3afe4e6df6002c319";

  var response = await fetch(apiUrl);
    console.log(response);
      if (response.ok) {
        console.log(response);
        var data = await response.json();
          var nameValue = data.name;
          var tempValue = data.main.temp;
          var humidityValue = data.main.humidity;
          var windValue = data.wind.speed;
          console.log(data);
          var lat = data.coord.lon;
          var lon = data.coord.lat;
          await uvIndex(data.coord.lat, data.coord.lon);
          var icon = data.weather[0].icon;

          //weatherIcon.src 
          var weatherURL =`http://openweathermap.org/img/wn/${icon}.png`;
          var icon = `<img src="${weatherURL}"/>`;
         console.log(weatherIcon);

          cityDateIcon.innerHTML = 
            nameValue + currentDate.format(" (M/DD/YYYY) ") + icon;
          temp.innerHTML = "Temperature: " + tempValue + " °F";
          humidity.innerHTML = "Humidity: " + humidityValue + "%";
          wind.innerHTML = "Wind Speed: " + windValue + " MPH";
          console.log(weatherIcon);
            
            console.log(icon);

          //   searchInput.textContent = "";
      } else {
        alert("Error: " + response.statusText);
      }
    })
    // promise
    // .catch(function (error) {
    //   alert("Unable to connect to OpenWeatherMap");
    // });

async function uvIndex(lat, lon) {
  var uviUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=9795009f60d5d1c3afe4e6df6002c319";
  var response = await fetch(uviUrl);

  if (response.ok) {
    console.log(response);
    var data = await response.json();
    console.log(data);
    var uviValue = data.current.uvi;
    var fiveDayData = data.daily;
    console.log(fiveDayData);
    uvi.innerHTML = "UV Index: " + uviValue;
    var cardString = '';
    //fiveDayData = fiveDayData.slice(0, 5);
    for (var i = 0; i < fiveDayData.length; i++) {
        if(i >= 5)
            break; 
        var cardData = fiveDayData[i];
        var cardTemp = cardData.temp.day;
        var cardHumidity = cardData.humidity;
        var iconImage = cardData.weather[0].icon;
        var weatherURL =`http://openweathermap.org/img/wn/${iconImage}.png`;
        var icon = `<img src="${weatherURL}" style="width: 75px"/>`;
        cardString += `
            <div class="card" style="flex: 1">
                <h6>${moment(new Date(cardData.dt * 1000)).format(" M/DD/YYYY")}</h6>
                    ${icon}
                <p>Temp: ${cardTemp}&deg;F</p>
                <p>Humidity: ${cardHumidity}%</p>
            </div>
        `

    }
    console.log(cardString);
    var fiveDayCardContainer = document.querySelector("#cards");
    fiveDayCardContainer.innerHTML = cardString; 
  }
}





// search for city, get current and future conditions

// current weather: city name, date, icon of conditions, temp, humidity, wind speed

// uvi with color indicating favorable, moderate, severe conditions

// future weather: 5 day forecast with date, icon of conditions, temp, humidity

// add city to search history, when clicked, present current and future
