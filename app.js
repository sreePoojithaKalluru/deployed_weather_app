require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// ===================
// Middleware Setup
// ===================
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===================
// Session Configuration
// ===================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true only if using HTTPS
  })
);

// ===================
// MongoDB Connection
// ===================
const client = new MongoClient(process.env.MONGO_URI);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully");

    const db = client.db();
    app.locals.db = db;

    // ===================
    // Routes
    // ===================

    // 👉 Login routes (POST /login)
    const loginRoutes = require("./routes/loginRoutes");
    app.use("/", loginRoutes);

    // 👉 Admin routes (GET /admin/searches)
    const adminRoutes = require("./routes/adminRoutes");
    app.use("/admin", adminRoutes); // This handles /admin/searches

    // 👉 Weather API
    const weatherRoutes = require("./routes/weatherRoutes");
    app.use("/api/weather", weatherRoutes);

    // 🔒 Admin dashboard route
    app.get("/admin", (req, res) => {
      if (req.session.isAuthenticated) {
        res.sendFile(path.join(__dirname, "public", "admin.html"));
      } else {
        res.redirect("/login.html");
      }
    });

    // 🔓 Logout
    app.post("/logout", (req, res) => {
      req.session.destroy(() => {
        res.redirect("/login.html");
      });
    });

    // 🧭 Default route → login
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "login.html"));
    });

    // ✅ Optional: route to access weather UI
    app.get("/weather", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    // ===================
    // Start Server
    // ===================
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

startServer();
