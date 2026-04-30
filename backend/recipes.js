const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  );

  const data = await response.json();
  res.json(data.meals);
});

router.get("/:id", async (req, res) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`,
  );

  const data = await response.json();
  res.json(data.meals[0]);
});

module.exports = router;
