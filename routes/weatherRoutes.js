// const express = require("express");
// const router = express.Router();
// const fetch = require("node-fetch");

// const API_KEY = process.env.OPENWEATHER_API_KEY; // API key from .env

// // Route: GET /api/weather/search?q=cityname
// router.get("/search", async (req, res) => {
//   const city = req.query.q?.trim();

//   if (!city) {
//     return res.status(400).json({ success: false, error: "City name is required in query parameter 'q'." });
//   }

//   try {
//     // 🌤️ Fetch weather data from OpenWeatherMap API
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
//     const response = await fetch(url);

//     const data = await response.json();

//     if (!response.ok) {
//       return res.status(response.status).json({
//         success: false,
//         error: data?.message || "Failed to fetch weather data.",
//       });
//     }

//     // 📝 Save search to MongoDB
//     const db = req.app.locals.db;
//     const citiesCollection = db.collection("searchedCities");

//     await citiesCollection.updateOne(
//       { name: city.toLowerCase() },
//       {
//         $set: {
//           name: city.toLowerCase(),
//           searchedAt: new Date(),
//           temperature: data.main?.temp || null,
//           weather: data.weather?.[0]?.main || null,
//         },
//       },
//       { upsert: true }
//     );

//     // ✅ Success response
//     res.json({
//       success: true,
//       data,
//     });
//   } catch (err) {
//     console.error("❌ Error in /api/weather/search:", err);
//     res.status(500).json({
//       success: false,
//       error: "Internal server error while fetching weather data.",
//     });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const API_KEY = process.env.OPENWEATHER_API_KEY; // API key from .env

// Route: GET /api/weather/search?q=cityname
router.get("/search", async (req, res) => {
  const city = req.query.q?.trim();

  if (!city) {
    console.log("⚠️ City name missing in query");
    return res.status(400).json({ success: false, error: "City name is required in query parameter 'q'." });
  }

  console.log(`📥 Weather search requested for: "${city}"`);

  try {
    // 🌤️ Fetch weather data from OpenWeatherMap API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.log(`❌ OpenWeather API error: ${data?.message}`);
      return res.status(response.status).json({
        success: false,
        error: data?.message || "Failed to fetch weather data.",
      });
    }

    // 📝 Save search to MongoDB
    const db = req.app.locals.db;
    const citiesCollection = db.collection("searchedCities");

    await citiesCollection.updateOne(
      { name: city.toLowerCase() },
      {
        $set: {
          name: city.toLowerCase(),
          searchedAt: new Date(),
          temperature: data.main?.temp || null,
          weather: data.weather?.[0]?.main || null,
        },
      },
      { upsert: true }
    );

    console.log(`✅ City "${city}" saved/updated in MongoDB`);

    // ✅ Success response
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("❌ Error in /api/weather/search:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching weather data.",
    });
  }
});

module.exports = router;
