require("dotenv").config();

const express = require("express");
const router = express.Router();

// Admin credentials from environment
const adminUser = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS
};

// POST /login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send(`
      <h2 style="color:orange; font-family:sans-serif">⚠️ Missing username or password</h2>
      <p><a href="/login.html">Back to Login</a></p>
    `);
  }

  if (username === adminUser.username && password === adminUser.password) {
    req.session.isAuthenticated = true;
    console.log("✅ Admin login successful");
    return res.redirect("/admin");
  }

  console.warn("❌ Admin login failed: Invalid credentials");
  res.status(401).send(`
    <h2 style="color:red; font-family:sans-serif">❌ Invalid username or password</h2>
    <p><a href="/login.html">Back to Login</a></p>
  `);
});

module.exports = router;
