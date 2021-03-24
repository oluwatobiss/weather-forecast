const searchErrorText = document.getElementById("searchErrorText");
const searchBar = document.getElementById("search-bar");
const searchBarBtn = document.getElementById("search-bar-btn");
const fahCelCheckbox = document.getElementById("checkbox");
const descriptionSpan = document.getElementById("description");
const cityEle = document.getElementById("city");
const tempSpan = document.getElementById("temp");
const feelsLikeSpan = document.getElementById("feels-like");
const humiditySpan = document.getElementById("humidity");
const windSpan = document.getElementById("wind");
const timeSpan = document.getElementById("time");

let unitsOfMeasurement = null;
let tempUnitSymbol = null;
let windUnitSymbol = null;

window.addEventListener("load", chooseRandomCity);
document.addEventListener("keydown", getPressedKey);
searchBarBtn.addEventListener("click", getSearchedCity);

function chooseRandomCity() {
    const cities = [
        "Antalya", "Bangkok", "Delhi", "Dubai", "Hawaii", "Hong Kong", "Istanbul", "Jerusalem", "Kuala Lumpur", 
        "London", "Macau", "Mecca", "Montreal", "New York City", "Lagos", "Paris", "Rome", "Singapore", "Tokyo", "Yakutsk"
    ]

    const selectedCity = cities[Math.floor(Math.random() * cities.length)];
    getSearchedCity(selectedCity);
}

function getPressedKey(keyPressed) {
    if (keyPressed.key === "Enter") {
        getSearchedCity();
    } else {
        searchErrorText.innerText = "";
    }
}

function getSearchedCity(selectedCity) {
    let searchedCity = searchBar.value;
    const englishRegionName = new Intl.DisplayNames(["en"], {type: "region"});

    if (selectedCity) {
        searchedCity = selectedCity;
    }

    if (searchedCity === "") {
        searchErrorText.innerText = "Please enter a city.";
        return;
    }

    if (fahCelCheckbox.checked) {
        unitsOfMeasurement = "metric";
        tempUnitSymbol = "℃";
        windUnitSymbol = "m/s";
    } else {
        unitsOfMeasurement = "imperial";
        tempUnitSymbol = "℉";
        windUnitSymbol = "m/h";
    }

    searchBar.value = "";
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${unitsOfMeasurement}&APPID=0f07f6f38ba2f139046630b2150bcd52`)
    .then(function(res) {
        return res.json();
    })
    .then(function(res) {
        const countryCode = res.sys.country;
        const cityAndCountry = `${res.name}, ${englishRegionName.of(countryCode)}`;
        const weatherMain = res.weather[0].main;
        const weatherDesc = res.weather[0].description;
        const temp = res.main.temp;
        const tempFeelsLike = res.main.feels_like;
        const humidity = res.main.humidity;
        const windSpeed = res.wind.speed;

        changeWeatherImageAndIcon(weatherMain);
        showWeatherData(weatherDesc, cityAndCountry, temp, countryCode, tempFeelsLike, humidity, windSpeed);
        getTimeAndDate(cityAndCountry);
    })
    .catch(function() {
        searchErrorText.innerText = "Oops! That city seems to be nowhere. Try again.";
    });
}

function changeWeatherImageAndIcon(weatherMainDesc) {
    const bodyEle = document.querySelector("body");
    const descriptionIcon = document.querySelector(".weather-icon");
    const iconEle = document.createElement("i");
    console.log("weatherMainDesc: " + weatherMainDesc);

    if (weatherMainDesc === "Thunderstorm") {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2019/11/01/08/44/flashes-4593614_1280.jpg")';
        iconEle.classList.add("fas", "fa-bolt", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    } else if (weatherMainDesc === "Drizzle") {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2020/04/27/17/58/petals-5100957_1280.jpg")';
        iconEle.classList.add("fas", "fa-cloud-rain", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    } else if (weatherMainDesc === "Rain") {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2018/07/19/07/03/jesus-3548007_1280.jpg")';
        iconEle.classList.add("fas", "fa-cloud-showers-heavy", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    } else if (weatherMainDesc === "Snow") {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2019/12/09/17/08/fantasy-4683928_1280.jpg")';
        iconEle.classList.add("fas", "fa-snowflake", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    } else if (
        (weatherMainDesc === "Mist") || (weatherMainDesc === "Smoke") || (weatherMainDesc === "Haze") ||
        (weatherMainDesc === "Dust") || (weatherMainDesc === "Fog") || (weatherMainDesc === "Sand") ||
        (weatherMainDesc === "Ash") || (weatherMainDesc === "Squall") || (weatherMainDesc === "Tornado")
    ) {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2019/10/07/13/18/mystery-4532583_1280.jpg")';
        iconEle.classList.add("fas", "fa-stream", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    } else if (weatherMainDesc === "Clear") {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2017/11/03/18/37/sun-2915215_1280.jpg")';
        iconEle.classList.add("fas", "fa-sun", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    } else if (weatherMainDesc === "Clouds") {
        bodyEle.style.backgroundImage =  'linear-gradient(black, black), url("https://cdn.pixabay.com/photo/2016/11/18/01/45/moon-1833172_1280.jpg")';
        iconEle.classList.add("fas", "fa-cloud", "weather-icon");
        descriptionIcon.replaceWith(iconEle);
    }
}

function showWeatherData(weatherDesc, cityAndCountry, temp, countryCode, tempFeelsLike, humidity, windSpeed) {
    descriptionSpan.innerText = weatherDesc;
    cityEle.innerText = cityAndCountry;
    tempSpan.innerText = `${Math.round(temp)}${tempUnitSymbol}`;
    tempSpan.style.background = `url("https://flagcdn.com/h240/${countryCode.toLowerCase()}.png") no-repeat center`;
    tempSpan.style.backgroundSize = "contain";
    feelsLikeSpan.innerText = `${Math.round(tempFeelsLike)}${tempUnitSymbol}`;
    humiditySpan.innerText = `${Math.round(humidity)}%`;
    windSpan.innerText = `${windSpeed}${windUnitSymbol}`;
}

function getTimeAndDate(cityAndCountry) {
    fetch(`https://timezone.abstractapi.com/v1/current_time?api_key=6c6db9bc95f54f6f99ffb4b7a1c892b1&location=${cityAndCountry}`)
    .then(function(res) {
        return res.json();
    })
    .then(function(res) {
        const currDateAndTime = res.datetime;
        const currHour = currDateAndTime.split(" ")[1].split(":", 1);
        if (currHour >= 12) {
            timeSpan.innerText = `${currDateAndTime.replace(" ", ", ")} p.m.`;
        } else {
            timeSpan.innerText = `${currDateAndTime.replace(" ", ", ")} a.m.`;
        }
    })
    .catch(function(err) {
        console.error(err);
    });
}