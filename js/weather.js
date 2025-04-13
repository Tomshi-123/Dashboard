

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "3d4286229030b25633c851fe851bce41"; // Ersätt med din OpenWeather API-nyckel
    const weatherContainer = document.getElementById('weather-info');
    const tempDivInfo = document.getElementById('temp-div');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Funktion för att hämta väder baserat på latitud och longitud
    function getWeatherByLocation(lat, lon) {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        // Hämta aktuellt väder
        fetch(currentWeatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Det gick inte att hämta väderdata.');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error("Error fetching current weather data:", error);
                weatherContainer.innerHTML = `<p>Failed to load weather data. Error: ${error.message}</p>`;
            });

        // Hämta timprognos
        fetch(forecastUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Det gick inte att hämta timprognosen.');
                }
                return response.json();
            })
            .then(data => {
                displayHourlyForecast(data.list.slice(0, 8)); // Visa de kommande 8 timmarna
            })
            .catch(error => {
                console.error("Error fetching hourly forecast:", error);
                hourlyForecastDiv.innerHTML = `<p>Failed to load hourly forecast. Error: ${error.message}</p>`;
            });
    }

    // Funktion för att visa väderdata
    function displayWeather(data) {
        const { name, weather, main } = data;

        tempDivInfo.innerHTML = `<p>${main.temp}°C</p>`;
        weatherContainer.innerHTML = `<p>${name}</p><p>${weather[0].description}</p>`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        weatherIcon.alt = weather[0].description;
        weatherIcon.style.display = 'block';
    }

    // Funktion för att visa timprognos
    function displayHourlyForecast(forecast) {
        hourlyForecastDiv.innerHTML = ''; // Rensa tidigare prognos
        forecast.forEach(item => {
            const time = new Date(item.dt * 1000).getHours(); // Konvertera UNIX-tid till timmar
            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${time}:00</span>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Hourly Weather Icon">
                    <span>${item.main.temp}°C</span>
                </div>`;
            hourlyForecastDiv.innerHTML += hourlyItemHtml;
        });
    }

    // Funktion för att hämta användarens plats med Geolocation API
    function detectLocationAndGetWeather() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    getWeatherByLocation(latitude, longitude);
                },
                function (error) {
                    console.error("Error getting location:", error.message);
                    weatherContainer.innerHTML = `<p>Failed to get location. Please allow location access.</p>`;
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            weatherContainer.innerHTML = `<p>Geolocation is not supported by your browser.</p>`;
        }
    }

    // Lägg till event listener för knappen
    document.getElementById("weatherBtn").addEventListener("click", function () {
        const cityInput = document.getElementById('city').value;
        if (cityInput) {
            getWeatherByCity(cityInput);
        } else {
            detectLocationAndGetWeather(); // Om ingen stad anges, använd Geolocation
        }
    });

    // Funktion för att hämta väder baserat på stad
    function getWeatherByCity(city) {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        // Hämta aktuellt väder
        fetch(currentWeatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Det gick inte att hämta väderdata för staden.');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherContainer.innerHTML = `<p>Failed to load weather data. Error: ${error.message}</p>`;
            });

        // Hämta timprognos
        fetch(forecastUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Det gick inte att hämta timprognosen.');
                }
                return response.json();
            })
            .then(data => {
                displayHourlyForecast(data.list.slice(0, 8)); // Visa de kommande 8 timmarna
            })
            .catch(error => {
                console.error("Error fetching hourly forecast:", error);
                hourlyForecastDiv.innerHTML = `<p>Failed to load hourly forecast. Error: ${error.message}</p>`;
            });
    }

    // Anropa Geolocation API när sidan laddas
    detectLocationAndGetWeather();
});