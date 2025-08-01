const express = require("express");
const router = express.Router();

// ✅ Middleware to check if admin is logged in
function requireAuth(req, res, next) {
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized access" });
  }
}

// ✅ GET /admin/searches — fetch recent weather searches (only if logged in)
router.get("/searches", requireAuth, async (req, res) => {
  try {
    const db = req.app.locals.db;
    const collection = db.collection("searchedCities"); // ✅ updated to correct collection

    const searches = await collection
      .find({})
      .sort({ timestamp: -1 }) // newest first
      .limit(10)
      .toArray();

    res.json(searches);
  } catch (error) {
    console.error("❌ Error fetching search history:", error);
    res.status(500).json({ error: "Failed to fetch search history" });
  }
});

module.exports = router;
