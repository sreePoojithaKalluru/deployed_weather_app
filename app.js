const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve static files (HTML, CSS, JS, images) from the public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // If needed for future API requests

// Use only supported options with MongoClient
const client = new MongoClient(process.env.MONGO_URI);

async function startServer() {
  try {
    // Connect to MongoDB Atlas
    await client.connect();
    console.log("✅ MongoDB connected successfully");

    // Use the database from URI
    const db = client.db();
    app.locals.db = db;

    // Load routes
    const weatherRoutes = require("./routes/weatherRoutes");
    app.use("/api/weather", weatherRoutes);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Stop the server if DB connection fails
  }
}

startServer();
