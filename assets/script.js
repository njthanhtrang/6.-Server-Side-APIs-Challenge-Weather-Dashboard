var searchInput = document.querySelector(".inputValue");
var searchBtn = document.querySelector(".searchBtn");
var cityDateIcon = document.querySelector(".city-date-icon");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvi = document.querySelector(".uvi");

var searchSubmitHandler = function(event) {
    event.preventDefault;

    var city = searchInput.value.trim();

    if (city) {
        getCityWeather(city);

        searchInput.value = "";
    } else {
        alert("Please enter a city");
    }
};

    searchBtn.addEventListener("click", function() {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ searchInput.value + "&appid=9795009f60d5d1c3afe4e6df6002c319"

    fetch(apiUrl)
    // promise
    .then(function(response) {
        if(response.ok) {
            console.log(response);
            response.json().then(function(data) {
                var nameValue = data["name"];
                var tempValue = data["main"]["temp"];
                var humidityValue = data["main"]["humidity"];
                var windValue = data["wind"]["speed"];
                var uviValue = data["uvi"]


            });

                console.log(data);
            
        } else {
            alert("Error: " + response.statusText);
        }

        // cityDateIcon.innerHTML = 
    })
    // promise
    .catch(function(error) {
        alert("Unable to connect to OpenWeatherMap");
    })
})



// search for city, get current and future conditions

// current weather: city name, date, icon of conditions, temp, humidity, wind speed

// uvi with color indicating favorable, moderate, severe conditions

// future weather: 5 day forecast with date, icon of conditions, temp, humidity

// add city to search history, when clicked, present current and future
