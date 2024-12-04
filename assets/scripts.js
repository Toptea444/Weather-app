document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const cityInput = document.getElementById('city');
    const weatherContainer = document.getElementById('weatherContainer');
    const forecastContainer = document.getElementById('forecast');
    const errorMessage = document.getElementById('errorMessage');
    const loadingIndicator = document.getElementById('loading');

const showWeatherData = (data) => {
    const locationName = document.getElementById('locationName');
    const locationId = document.getElementById('locationId');
    const weatherDescription = document.getElementById('weatherDescription');
    const weatherTemperature = document.getElementById('weatherTemperature');
    const forecastContainer = document.getElementById('forecastContainer');

    locationName.textContent = data.city.name;
    locationId.textContent = `Location ID: ${data.city.id}`;
    weatherDescription.textContent = data.list[0].weather[0].description;

    // Find the high and low temperatures for today
    const todayTemps = data.list.slice(0, 8); // First 8 entries are for the first day
    const highTemp = Math.max(...todayTemps.map(item => item.main.temp));
    const lowTemp = Math.min(...todayTemps.map(item => item.main.temp));
    weatherTemperature.textContent = `High: ${highTemp.toFixed(2)} °C, Low: ${lowTemp.toFixed(2)} °C`;

    forecastContainer.innerHTML = '';
    data.list.slice(8, 40).forEach(item => {
        const dayElement = document.createElement('div');
        dayElement.className = 'bg-white p-4 rounded-lg shadow-md dark:bg-gray-800';
        const date = new Date(item.dt * 1000).toLocaleDateString();
        dayElement.innerHTML = `
            <h3 class="text-xl text-blue-600 dark:text-blue-400">${date}</h3>
            <p class="text-lg">${item.weather[0].description}</p>
            <p class="text-lg font-semibold">${item.main.temp} °C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });

    weatherContainer.classList.remove('hidden');
    errorMessage.classList.add('hidden');
};




    const updateBackground = (condition) => {
        const body = document.body;
        body.className = '';

        if (condition.includes('rain')) {
            body.classList.add('bg-gradient-to-br', 'from-gray-700', 'to-blue-900');
        } else if (condition.includes('clear')) {
            body.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-yellow-300');
        } else if (condition.includes('cloud')) {
            body.classList.add('bg-gradient-to-br', 'from-gray-500', 'to-gray-800');
        } else if (condition.includes('snow')) {
            body.classList.add('bg-gradient-to-br', 'from-blue-300', 'to-white');
        } else {
            body.classList.add('bg-gradient-to-br', 'from-gray-600', 'to-gray-900');
        }
    };

    const updateAnimation = (condition) => {
        const animationContainer = document.getElementById('weatherAnimation');
        animationContainer.innerHTML = '';

        let animationPath = '';
        if (condition.includes('rain')) {
            animationPath = 'path_to_rain_animation.json';
        } else if (condition.includes('clear')) {
            animationPath = 'path_to_sun_animation.json';
        } else if (condition.includes('snow')) {
            animationPath = 'path_to_snow_animation.json';
        } else if (condition.includes('cloud')) {
            animationPath = 'path_to_cloud_animation.json';
        }

        lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationPath
        });
    };

    const fetchWeather = async (url) => {
        loadingIndicator.classList.remove('hidden');
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            errorMessage.textContent = 'Error fetching data.';
            errorMessage.classList.remove('hidden');
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    };

    const displayWeather = (data) => {
        if (!data || data.error) {
            errorMessage.textContent = data.error || 'Unable to fetch weather data.';
            errorMessage.classList.remove('hidden');
            return;
        }

        document.getElementById('location').textContent = `${data.city.name}, ${data.city.country}`;
        document.getElementById('description').textContent = data.list[0].weather[0].description;

        updateBackground(data.list[0].weather[0].main.toLowerCase());
        updateAnimation(data.list[0].weather[0].main.toLowerCase());

        forecastContainer.innerHTML = '';
        data.list.slice(0, 7).forEach((item) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'p-4 bg-white bg-opacity-10 rounded-md text-center';
            dayElement.innerHTML = `
                <p>${new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>${item.weather[0].description}</p>
                <p>${item.main.temp} °C</p>
            `;
            forecastContainer.appendChild(dayElement);
        });

        weatherContainer.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!cityInput.value.trim()) return;

        fetchWeather(`api/weather.php?city=${encodeURIComponent(cityInput.value.trim())}`);
    });

    document.getElementById('geoButton').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(`api/weather.php?lat=${latitude}&lon=${longitude}`);
            });
        }
    });

    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
});
