const apiKey = '3d4286229030b25633c851fe851bce41';

async function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    localStorage.setItem('lastCity', city);

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    try {
        const responses = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        const [currentWeather, forecast] = await Promise.all(responses.map(res => res.json()));

        displayWeather(currentWeather);
        displayHourlyForecast(forecast.list.slice(0, 24));
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    tempDivInfo.innerHTML = '';
    weatherInfoDiv.innerHTML = '';

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const weatherData = { cityName, temperature, description, iconUrl };
    localStorage.setItem('weatherData', JSON.stringify(weatherData));

    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const forecastArray = [];

    hourlyData.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;

        forecastArray.push({ hour, temperature, iconUrl });
    });

    localStorage.setItem('hourlyForecastData', JSON.stringify(forecastArray));
}

async function detectLocationAndGetWeather() {
    try {
        const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await res.json();
        const userCity = data.city;

        if (userCity) {
            document.getElementById('city').value = userCity;
            getWeather();
        }
    } catch (error) {
        console.error('Kunde inte hämta plats:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const lastCity = localStorage.getItem('lastCity');
    const weatherData = JSON.parse(localStorage.getItem('weatherData'));
    const hourlyForecastData = JSON.parse(localStorage.getItem('hourlyForecastData'));

    if (lastCity) {
        document.getElementById('city').value = lastCity;
        getWeather();
    } else {
        detectLocationAndGetWeather();
    }

    if (weatherData) {
        const tempDivInfo = document.getElementById('temp-div');
        const weatherInfoDiv = document.getElementById('weather-info');
        const weatherIcon = document.getElementById('weather-icon');

        tempDivInfo.innerHTML = `<p>${weatherData.temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${weatherData.cityName}</p><p>${weatherData.description}</p>`;
        weatherIcon.src = weatherData.iconUrl;
        weatherIcon.alt = weatherData.description;
        weatherIcon.style.display = 'block';
    }

    if (hourlyForecastData) {
        const hourlyForecastDiv = document.getElementById('hourly-forecast');
        hourlyForecastDiv.innerHTML = '';

        hourlyForecastData.forEach(item => {
            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${item.hour}:00</span>
                    <img src="${item.iconUrl}" alt="Hourly Weather Icon">
                    <span>${item.temperature}°C</span>
                </div>`;
            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }
});

document.getElementById("weatherBtn").addEventListener("click", function () {
    getWeather();
});