const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    );

    const data = await response.json();
    res.json(data.meals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );

    const data = await response.json();

    if (!data.meals) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(data.meals[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

module.exports = router;
