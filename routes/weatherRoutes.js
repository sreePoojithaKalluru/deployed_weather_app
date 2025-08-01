const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error("❌ OPENWEATHER_API_KEY is missing. Check your .env file.");
}

// Route: GET /api/weather/search?q=cityname
router.get("/search", async (req, res) => {
  const city = req.query.q?.trim();

  if (!city) {
    console.warn("⚠️ City name missing in query");
    return res.status(400).json({
      success: false,
      error: "City name is required in query parameter 'q'."
    });
  }

  console.log(`📥 Weather search requested for: "${city}"`);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data || !data.main || !data.sys) {
      const errMsg = data?.message || "OpenWeatherMap API returned an error.";
      console.error(`❌ API error for "${city}": ${errMsg}`);
      return res.status(response.status || 500).json({
        success: false,
        error: errMsg
      });
    }

    // 📝 Save to MongoDB
    const db = req.app.locals.db;
    const citiesCollection = db.collection("searchedCities");

    await citiesCollection.insertOne({
      city: data.name || city,
      country: data.sys?.country || "N/A",
      temp: data.main?.temp?.toFixed(1) || null,
      weather: data.weather?.[0]?.main || "N/A",
      timestamp: new Date()
    });

    console.log(`✅ Weather data for "${data.name}" saved.`);

    res.json({
      success: true,
      data
    });

  } catch (err) {
    console.error("❌ Server error in /api/weather/search:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching weather data."
    });
  }
});

module.exports = router;
