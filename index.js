(() => {
    const loadingSpinnerDiv = document.getElementById("loading-spinner");
    const searchErrorText = document.getElementById("search-error-text");
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
    let temp = null;
    let tempFeelsLike = null;
    
    window.addEventListener("load", chooseRandomCity);
    document.addEventListener("keydown", getPressedKey);
    searchBarBtn.addEventListener("click", getSearchedCity);
    fahCelCheckbox.addEventListener("click", toggleFahCel);
    
    function chooseRandomCity() {
        const cities = [
            "Antalya, TR", "Bangkok, TH", "Delhi, IN", "Dubai, AE", "Hawaii, US", 
            "Hong Kong, HK", "Istanbul, TR", "Jerusalem, IL", "Kuala Lumpur, MY", 
            "London, UK", "Macao, MO", "Mecca, SA", "Montreal, CA", "New York City, US",
            "Lagos, NG", "Paris, FR", "Rome, IT", "Singapore, SG", "Tokyo, JP", "Yakutsk, RU"
        ];
    
        const selectedCity = cities[Math.floor(Math.random() * cities.length)];
        getSearchedCity(selectedCity);
    }
    
    function getSearchedCity(selectedCity) {
        let searchedCity = searchBar.value;
        loadingSpinnerDiv.style.display = "block";
    
        if (typeof selectedCity === "string") {
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
    
        async function getWeatherData() {
            try {
                const englishRegionName = new Intl.DisplayNames(["en"], {type: "region"});
                const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=${unitsOfMeasurement}&APPID=0f07f6f38ba2f139046630b2150bcd52`);
                const jsonWeatherData = await weatherData.json();
                const countryCode = jsonWeatherData.sys.country;
                const countryName = englishRegionName.of(countryCode);
                const cityAndCountry = `${jsonWeatherData.name}, ${countryName}`;
                const weatherMain = jsonWeatherData.weather[0].main;
                const weatherDesc = jsonWeatherData.weather[0].description;
                const humidity = jsonWeatherData.main.humidity;
                const windSpeed = jsonWeatherData.wind.speed;
    
                temp = jsonWeatherData.main.temp;
                tempFeelsLike = jsonWeatherData.main.feels_like;
                timeSpan.innerText = `Every moment in ${countryName} is lovely!`;
                loadingSpinnerDiv.style.display = "none";
                
                changeWeatherImageAndIcon(weatherMain);
                showWeatherData(weatherDesc, cityAndCountry, temp, countryCode, tempFeelsLike, humidity, windSpeed);
                getTimeAndDate(cityAndCountry);
            } catch {
                searchErrorText.innerText = "Oops! That city seems to be nowhere. Try again.";
            }
        }
        getWeatherData();
    }
    
    function changeWeatherImageAndIcon(weatherMainDesc) {
        const bodyEle = document.querySelector("body");
        const descriptionIcon = document.querySelector(".weather-icon");
        const iconEle = document.createElement("i");
    
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
        tempSpan.innerText = `${Math.floor(temp)}${tempUnitSymbol}`;
        tempSpan.style.background = `url("https://flagcdn.com/h240/${countryCode.toLowerCase()}.png") no-repeat center`;
        tempSpan.style.backgroundSize = "contain";
        feelsLikeSpan.innerText = `${Math.floor(tempFeelsLike)}${tempUnitSymbol}`;
        humiditySpan.innerText = `${Math.floor(humidity)}%`;
        windSpan.innerText = `${windSpeed}${windUnitSymbol}`;
    }
    
    async function getTimeAndDate(cityAndCountry) {
        try {
            const timeAndDateData = await fetch(`https://timezone.abstractapi.com/v1/current_time?api_key=6c6db9bc95f54f6f99ffb4b7a1c892b1&location=${cityAndCountry}`);
            const jsonTimeAndDateData = await timeAndDateData.json();
            const currDateAndTime = jsonTimeAndDateData.datetime;
            const currHour = currDateAndTime.split(" ")[1].split(":", 1);
            (currHour >= 12) ? 
            timeSpan.innerText = `${currDateAndTime.replace(" ", ", ")} p.m.` :
            timeSpan.innerText = `${currDateAndTime.replace(" ", ", ")} a.m.`;
        } catch (err) { console.error(err); }
    }
    
    function getPressedKey(keyPressed) {
        if (keyPressed.key === "Enter") {
            getSearchedCity();
        } else {
            searchErrorText.innerText = "";
            loadingSpinnerDiv.style.display = "none";
        }
    }
    
    function toggleFahCel() {
        if (fahCelCheckbox.checked) {
            const tempCel = (temp - 32) * (5/9);
            const tempFeelsLikeCel = (tempFeelsLike - 32) * (5/9);
    
            temp = tempCel;
            tempSpan.innerText = `${Math.floor(tempCel)}℃`;;
    
            tempFeelsLike = tempFeelsLikeCel;
            feelsLikeSpan.innerText = `${Math.floor(tempFeelsLikeCel)}℃`;
        } else {
            const tempFah = (temp * (9/5)) + 32;
            const tempFeelsLikeFah = (tempFeelsLike * (9/5)) + 32;
    
            temp = tempFah;
            tempSpan.innerText = `${Math.floor(tempFah)}℉`;
    
            tempFeelsLike = tempFeelsLikeFah;
            feelsLikeSpan.innerText = `${Math.floor(tempFeelsLikeFah)}℉`;
        }
    }
})();