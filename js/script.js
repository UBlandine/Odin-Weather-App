// Process the JSON data and extract only the relevant information
function processWeatherData(data) {
  const processedData = {
    location: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };

  return processedData;
}

// Fetch weather data from the API
async function getWeatherData(location) {
  const apiKey = 'YOUR_API_KEY'; // Replace this with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return processWeatherData(data);
    } else {
      console.error('Error fetching weather data:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}


const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const loadingDiv = document.getElementById('loading');
const weatherDataDiv = document.getElementById('weatherData');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();

  if (location !== '') {
    loadingDiv.style.display = 'block';
    weatherDataDiv.textContent = '';

    const weatherData = await getWeatherData(location);

    loadingDiv.style.display = 'none';

    if (weatherData) {
      weatherDataDiv.innerHTML = `
        <h2>Weather in ${weatherData.location}, ${weatherData.country}</h2>
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Description: ${weatherData.description}</p>
        <p>Humidity: ${weatherData.humidity}%</p>
        <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
      `;
    } else {
      weatherDataDiv.textContent = 'Error fetching weather data. Please try again later.';
    }
  }
});
