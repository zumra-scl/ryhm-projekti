const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search || "chicken";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
    );
    const data = await response.json();

    res.json(data.meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await response.json();

    res.json(data.meals[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

module.exports = router;
