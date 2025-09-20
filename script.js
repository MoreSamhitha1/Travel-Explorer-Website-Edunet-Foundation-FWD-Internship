
const UNSPLASH_API_KEY = "cQdn7h-A9m4Oubp6EfM95KGYfuU7efa9ylhzyptTAeU";
const WEATHER_API_KEY = "d63918e7f85218b409b64437522c4598";

const states = [
  {
    name: "Kerala",
    lat: 10.8505,
    lon: 76.2711,
    description: "God’s Own Country, Kerala, is a tropical paradise with backwaters, beaches, and lush greenery. Alleppey’s houseboat cruises and Munnar’s tea gardens are iconic experiences. The state’s Ayurvedic traditions and spice plantations add to its allure. Kerala’s cuisine, from appam to seafood, is a gastronomic delight. With its high literacy rate and tranquil vibe, Kerala is a model of sustainable tourism."
  },
  {
    name: "Telangana",
    lat: 17.3850,
    lon: 78.4867,
    description: "Telangana, the land of the Charminar and Golconda Fort, is a blend of history and modernity. Hyderabad, its capital, is famous for its biryani and pearls, while Warangal’s thousand-pillar temple leaves visitors in awe. The state’s vibrant festivals, like Bonalu and Bathukamma, showcase its rich culture. Telangana’s IT hub, HITEC City, contrasts beautifully with its rural charm. From the serene Hussain Sagar Lake to the lush forests of Kawal, it’s a treasure trove for travelers."
  },
  {
    name: "Karnataka",
    lat: 12.9716,
    lon: 77.5946,
    description: "Karnataka is a microcosm of India, offering beaches, hills, and heritage sites. Bangalore, the Silicon Valley of India, buzzes with energy, while Mysore’s palace and Hampi’s ruins whisper tales of empires. The Western Ghats, a UNESCO site, are a biodiversity hotspot. Karnataka’s classical music, dance, and literature reflect its cultural depth. From Coorg’s coffee plantations to Gokarna’s serene beaches, it’s a traveler’s dream."
  },
  {
    name: "Andhra Pradesh",
    lat: 15.9129,
    lon: 79.7400,
    description: "Andhra Pradesh is a land of rivers, temples, and spicy cuisine. Tirupati’s Venkateswara Temple is one of the world’s most visited pilgrimage sites. The state’s Borra Caves and Araku Valley offer breathtaking natural beauty. Andhra’s cuisine, especially its tangy pickles and biryani, is legendary. With a coastline dotted with pristine beaches, it’s a hidden gem for explorers."
  },
  {
    name: "Tamil Nadu",
    lat: 11.1271,
    lon: 78.6569,
    description: "Tamil Nadu is a cultural powerhouse, home to ancient temples and classical arts. Chennai’s Marina Beach and Mahabalipuram’s shore temples are iconic landmarks. The state’s Dravidian architecture, seen in Madurai’s Meenakshi Temple, is awe-inspiring. Tamil Nadu’s filter coffee and Chettinad cuisine are world-famous. From the Nilgiri Hills to the coral reefs of Gulf of Mannar, it’s a diverse destination."
  },
  {
    name: "Rajasthan",
    lat: 27.0238,
    lon: 74.2179,
    description: "Rajasthan, the land of kings, is a riot of colors and royalty. Jaipur’s Pink City, Udaipur’s lakes, and Jaisalmer’s golden deserts are postcard-perfect. The state’s forts, like Mehrangarh and Amber, narrate tales of valor. Rajasthan’s folk music, puppetry, and vibrant markets are a cultural feast. A hot-air balloon ride over its landscapes is a bucket-list experience."
  },
  {
    name: "Uttar Pradesh",
    lat: 26.8467,
    lon: 80.9462,
    description: "Uttar Pradesh is the heart of India’s spiritual and historical heritage. Varanasi’s ghats and the Taj Mahal in Agra are timeless symbols of devotion and love. Lucknow’s nawabi culture and Awadhi cuisine are legendary. The state’s festivals, like Kumbh Mela, draw millions of pilgrims. From the Ganges to the Thar desert, it’s a land of contrasts."
  },
  {
    name: "Himachal Pradesh",
    lat: 31.1048,
    lon: 77.1734,
    description: "Himachal Pradesh is nature’s playground, with snow-capped peaks and verdant valleys. Shimla’s colonial charm and Manali’s adventure sports attract thrill-seekers. The state’s Buddhist monasteries, like Dharamshala, offer peace and serenity. Himachal’s apples, woolen crafts, and local cuisine are delightful. A trek in the Himalayas here is a soul-stirring experience."
  },
  {
    name: "Punjab",
    lat: 31.1471,
    lon: 75.3412,
    description: "Punjab is the land of five rivers, golden fields, and warm hospitality. Amritsar’s Golden Temple and Wagah Border are must-visit spots. The state’s Bhangra dance and folk music are energetic and infectious. Punjab’s food, from sarson ka saag to butter chicken, is comfort in every bite. Its rural heartland and urban cities like Chandigarh offer a perfect blend."
  },
  {
    name: "Delhi",
    lat: 28.7041,
    lon: 77.1025,
    description: "Delhi, India’s capital, is a melting pot of history and modernity. The Red Fort, Qutub Minar, and Humayun’s Tomb are architectural marvels. The city’s street food, from chole bhature to kebabs, is legendary. Delhi’s markets, like Chandni Chowk and Hauz Khas, are shopper’s paradises. With its metro, nightlife, and cultural festivals, it’s a city that never sleeps."
  }
];

// Function to fetch image from Unsplash
async function fetchUnsplashImage(query) {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    } else {
      return `https://source.unsplash.com/random/300x200/?${query}`;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return `https://source.unsplash.com/random/300x200/?${query}`;
  }
}


async function fetchWeatherData(lat, lon, card) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    const weatherInfo = `${data.main.temp}°C, ${data.weather[0].description}`;
    card.querySelector(".weather span").textContent = weatherInfo;
  } catch (error) {
    console.error("Error fetching weather:", error);
    card.querySelector(".weather span").textContent = "Weather data unavailable";
  }
}

async function createStateCards() {
  const container = document.getElementById("states-container");

  for (const state of states) {
    const imageUrl = await fetchUnsplashImage(state.name.toLowerCase());

    const card = document.createElement("div");
    card.className = "state-card";
    card.setAttribute("data-aos", "fade-up");

    card.innerHTML = `
      <img src="${imageUrl}" alt="${state.name}">
      <h3>${state.name}</h3>
      <p>${state.description}</p>
      <div class="weather">Weather: <span>Click the button below</span></div>
      <button class="weather-button" data-lat="${state.lat}" data-lon="${state.lon}">Check Weather</button>
    `;

    container.appendChild(card);
  }

  document.querySelectorAll(".weather-button").forEach(button => {
    button.addEventListener("click", async (e) => {
      const lat = e.target.getAttribute("data-lat");
      const lon = e.target.getAttribute("data-lon");
      const card = e.target.closest(".state-card");
      await fetchWeatherData(lat, lon, card);
    });
  });
}

document.addEventListener("DOMContentLoaded", createStateCards);
