const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.get("/recipes", async (req, res) => {
  const search = req.query.search || "chicken";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
    );
    const data = await response.json();

    res.json(data.meals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await response.json();

    res.json(data.meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
