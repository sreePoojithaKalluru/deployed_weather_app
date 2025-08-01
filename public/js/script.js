// // Tabs
// const userTab = document.querySelector("[data-userWeather]");
// const searchTab = document.querySelector("[data-searchWeather]");
// const userInfoContainer = document.querySelector(".user-info-container");
// const grantAccessContainer = document.querySelector(".grant-location-container");
// const searchForm = document.querySelector("[data-searchForm]");
// const searchInp = document.querySelector("[data-searchInp]");
// const apiErrorContainer = document.querySelector(".api-error-container");
// const loadingScreen = document.querySelector(".loading-container");
// const apiErrorImg = document.querySelector("[data-notFoundImg]");
// const apiErrorMessage = document.querySelector("[data-api-ErrorText]"); // ✅ corrected typo
// const apiErrorBtn = document.querySelector("[data-apiErrprBtn]");       // ✅ corrected typo
// const grantAccessBtn = document.querySelector("[data-grantAccess]");
// const messageText = document.querySelector("[data-messageText]");

// let currentTab = userTab;
// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; // ✅ Use environment variable in real project

// // Set default tab
// currentTab.classList.add("current-tab");
// getFromSessionStorage();

// // Tab switch logic
// function switchTab(clickedTab) {
//   if (clickedTab !== currentTab) {
//     currentTab.classList.remove("current-tab");
//     currentTab = clickedTab;
//     currentTab.classList.add("current-tab");

//     apiErrorContainer.classList.remove("active");

//     if (!searchForm.classList.contains("active")) {
//       userInfoContainer.classList.remove("active");
//       grantAccessContainer.classList.remove("active");
//       searchForm.classList.add("active");
//     } else {
//       searchForm.classList.remove("active");
//       getFromSessionStorage();
//     }
//   }
// }

// // Tab events
// userTab.addEventListener("click", () => switchTab(userTab));
// searchTab.addEventListener("click", () => switchTab(searchTab));

// // Session storage handler
// function getFromSessionStorage() {
//   const localCoordinates = sessionStorage.getItem("user-coordinates");
//   if (!localCoordinates) {
//     grantAccessContainer.classList.add("active");
//   } else {
//     const coordinates = JSON.parse(localCoordinates);
//     fetchUserWeatherInfo(coordinates);
//   }
// }

// // Location access
// grantAccessBtn.addEventListener("click", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else {
//     grantAccessBtn.style.display = "none";
//     messageText.innerText = "Geolocation is not supported by this browser.";
//   }
// });

// function showPosition(position) {
//   const userCoordinates = {
//     lat: position.coords.latitude,
//     lon: position.coords.longitude,
//   };
//   sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
//   fetchUserWeatherInfo(userCoordinates);
// }

// function showError(error) {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       messageText.innerText = "You denied the request for Geolocation.";
//       break;
//     case error.POSITION_UNAVAILABLE:
//       messageText.innerText = "Location information is unavailable.";
//       break;
//     case error.TIMEOUT:
//       messageText.innerText = "The request timed out.";
//       break;
//     case error.UNKNOWN_ERROR:
//       messageText.innerText = "An unknown error occurred.";
//       break;
//   }
// }

// // Fetch weather for current location
// async function fetchUserWeatherInfo(coordinates) {
//   const { lat, lon } = coordinates;

//   grantAccessContainer.classList.remove("active");
//   loadingScreen.classList.add("active");

//   try {
//     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//     const data = await res.json();

//     if (!data.sys) throw data;

//     loadingScreen.classList.remove("active");
//     userInfoContainer.classList.add("active");
//     renderWeatherInfo(data);
//   } catch (error) {
//     loadingScreen.classList.remove("active");
//     apiErrorContainer.classList.add("active");
//     apiErrorImg.style.display = "none";
//     apiErrorMessage.innerText = `Error: ${error?.message || "Unable to fetch weather."}`;

//     // Retry button
//     apiErrorBtn.style.display = "block";
//     const newBtn = apiErrorBtn.cloneNode(true);
//     apiErrorBtn.parentNode.replaceChild(newBtn, apiErrorBtn);
//     newBtn.addEventListener("click", () => fetchUserWeatherInfo(coordinates));
//   }
// }

// // Render weather info
// function renderWeatherInfo(data) {
//   const cityName = document.querySelector("[data-cityName]");
//   const countryIcon = document.querySelector("[data-countryIcon]");
//   const desc = document.querySelector("[data-weatherDesc]");
//   const weatherIcon = document.querySelector("[data-weatherIcon]");
//   const temp = document.querySelector("[data-temp]");
//   const windspeed = document.querySelector("[data-windspeed]");
//   const humidity = document.querySelector("[data-humidity]");
//   const cloudiness = document.querySelector("[data-cloudliness]"); // ✅ fixed typo from "cloudiness"

//   cityName.innerText = data?.name || "--";
//   countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
//   countryIcon.alt = data?.sys?.country || "Country";
//   desc.innerText = data?.weather?.[0]?.description || "--";
//   weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
//   weatherIcon.alt = data?.weather?.[0]?.main || "Weather";
//   temp.innerText = `${data?.main?.temp.toFixed(1)} °C`;
//   windspeed.innerText = `${data?.wind?.speed.toFixed(1)} m/s`;
//   humidity.innerText = `${data?.main?.humidity}%`;
//   cloudiness.innerText = `${data?.clouds?.all}%`;
// }

// // Handle search form
// searchForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const city = searchInp.value.trim();
//   if (city) {
//     fetchSearchWeatherInfo(city);
//     searchInp.value = "";
//   }
// });

// // Fetch weather for searched city
// async function fetchSearchWeatherInfo(city) {
//   loadingScreen.classList.add("active");
//   userInfoContainer.classList.remove("active");
//   apiErrorContainer.classList.remove("active");

//   try {
//     const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//     const data = await res.json();

//     if (!data.sys) throw data;

//     loadingScreen.classList.remove("active");
//     userInfoContainer.classList.add("active");
//     renderWeatherInfo(data);
//   } catch (error) {
//     loadingScreen.classList.remove("active");
//     apiErrorContainer.classList.add("active");
//     apiErrorMessage.innerText = `Error: ${error?.message || "City not found."}`;
//     apiErrorImg.style.display = "block";
//     apiErrorBtn.style.display = "none"; // Hide retry for search
//   }
// }
// Tabs
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const searchInp = document.querySelector("[data-searchInp]");
const apiErrorContainer = document.querySelector(".api-error-container");
const loadingScreen = document.querySelector(".loading-container");
const apiErrorImg = document.querySelector("[data-notFoundImg]");
const apiErrorMessage = document.querySelector("[data-api-ErrorText]");
const apiErrorBtn = document.querySelector("[data-apiErrprBtn]");
const grantAccessBtn = document.querySelector("[data-grantAccess]");
const messageText = document.querySelector("[data-messageText]");

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; // Replace with process.env in production

// Set default tab
currentTab.classList.add("current-tab");
getFromSessionStorage();

// Tab switch logic
function switchTab(clickedTab) {
  if (clickedTab !== currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    apiErrorContainer.classList.remove("active");

    if (!searchForm.classList.contains("active")) {
      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    } else {
      searchForm.classList.remove("active");
      getFromSessionStorage();
    }
  }
}

// Tab events
userTab.addEventListener("click", () => switchTab(userTab));
searchTab.addEventListener("click", () => switchTab(searchTab));

// Session storage handler
function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

// Location access
grantAccessBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    grantAccessBtn.style.display = "none";
    messageText.innerText = "Geolocation is not supported by this browser.";
  }
});

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      messageText.innerText = "You denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      messageText.innerText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      messageText.innerText = "The request timed out.";
      break;
    case error.UNKNOWN_ERROR:
      messageText.innerText = "An unknown error occurred.";
      break;
  }
}

// Fetch weather for current location
async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;

  grantAccessContainer.classList.remove("active");
  loadingScreen.classList.add("active");

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await res.json();

    if (!data.sys) throw data;

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
  } catch (error) {
    loadingScreen.classList.remove("active");
    apiErrorContainer.classList.add("active");
    apiErrorImg.style.display = "none";
    apiErrorMessage.innerText = `Error: ${error?.message || "Unable to fetch weather."}`;

    apiErrorBtn.style.display = "block";
    const newBtn = apiErrorBtn.cloneNode(true);
    apiErrorBtn.parentNode.replaceChild(newBtn, apiErrorBtn);
    newBtn.addEventListener("click", () => fetchUserWeatherInfo(coordinates));
  }
}

// Render weather info
function renderWeatherInfo(data) {
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windspeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-cloudliness]");

  cityName.innerText = data?.name || "--";
  countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
  countryIcon.alt = data?.sys?.country || "Country";
  desc.innerText = data?.weather?.[0]?.description || "--";
  weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
  weatherIcon.alt = data?.weather?.[0]?.main || "Weather";
  temp.innerText = `${data?.main?.temp.toFixed(1)} °C`;
  windspeed.innerText = `${data?.wind?.speed.toFixed(1)} m/s`;
  humidity.innerText = `${data?.main?.humidity}%`;
  cloudiness.innerText = `${data?.clouds?.all}%`;
}

// Handle search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInp.value.trim();
  if (city) {
    fetchSearchWeatherInfo(city);
    searchInp.value = "";
  }
});

// ✅ Fetch weather for searched city via your backend
async function fetchSearchWeatherInfo(city) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  apiErrorContainer.classList.remove("active");

  try {
    const res = await fetch(`/api/weather/search?q=${encodeURIComponent(city)}`);
    const responseData = await res.json();

    if (!responseData.success || !responseData.data?.sys) {
      throw responseData.data || { message: "City not found." };
    }

    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    renderWeatherInfo(responseData.data);

  } catch (error) {
    loadingScreen.classList.remove("active");
    apiErrorContainer.classList.add("active");
    apiErrorMessage.innerText = `Error: ${error?.message || "City not found."}`;
    apiErrorImg.style.display = "block";
    apiErrorBtn.style.display = "none";
  }
}

