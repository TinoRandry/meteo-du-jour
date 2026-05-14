const apiKey = 'cff3b9e57f6c1ef9006624beb6cf73f7'; 
const weatherCard = document.getElementById('weather-card');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// Fonction pour récupérer la météo
async function getWeather(city) {
    try {
        // Afficher le chargement
        loading.style.display = 'block';
        weatherCard.style.display = 'none';
        error.style.display = 'none';

        // Appel API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
        );

        if (!response.ok) {
            throw new Error('Ville non trouvée');
        }

        const data = await response.json();

        // Mettre à jour l'interface
        document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind').textContent = data.wind.speed;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Afficher les résultats
        loading.style.display = 'none';
        weatherCard.style.display = 'block';

    } catch (err) {
        loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = err.message;
    }
}

// Charger la météo d'une ville par défaut au démarrage
window.addEventListener('load', () => {
    getWeather('Paris');
});

// Rechercher au clic sur le bouton
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Rechercher avec la touche Entrée
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});
