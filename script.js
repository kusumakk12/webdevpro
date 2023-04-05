const API_KEY = "6ebb0413f221ae606c21ea6af00bf66d";
const cityForm = document.querySelector('#city-form');
const cityInput = document.querySelector('#city-input');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');

// Function to get current weather
const getCurrentWeather = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Function to get forecast data
const getForecast = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Function to display current weather
const displayCurrentWeather = (weather) => {
  const date = new Date(weather.dt * 1000).toLocaleString();
  const condition = weather.weather[0].main;
  const temperature = weather.main.temp;
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  currentWeather.innerHTML = `
    <h2>Current Weather for ${cityInput.value}</h2>
    <p>Date and Time: ${date}</p>
    <p>Condition: ${condition}</p>
    <p>Temperature: ${temperature} &deg;C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
};

// Function to display forecast
const displayForecast = (forecastData) => {
  const dailyData = forecastData.list.filter((data) => data.dt_txt.includes("12:00:00"));
  forecast.innerHTML = `
    <h2>7 Day Forecast for ${cityInput.value}</h2>
  `;
  dailyData.forEach((data) => {
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const condition = data.weather[0].main;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const card = document.createElement('div');
    card.classList.add('weather-card');
    card.innerHTML = `
      <h3>${date}</h3>
      <img src="${icon}" alt="${condition}" class="icon">
      <p class="condition">${condition}</p>
      <p class="temperature">${temperature} &deg;C</p>
      <p class="humidity">Humidity: ${humidity}%</p>
    `;
    forecast.appendChild(card);
  });
};

// Event listener for form submission
cityForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value;
  const currentWeatherData = await getCurrentWeather(city);
  displayCurrentWeather(currentWeatherData);
  const forecastData = await getForecast(city);
  displayForecast(forecastData);
});
