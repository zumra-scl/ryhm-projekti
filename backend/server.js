const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const usersRoutes = require("./users");
const reviewsRoutes = require("./reviews");
const recipesRoutes = require("./recipes");

app.use("/users", usersRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/recipes", recipesRoutes);

app.use(express.static(path.join(__dirname, "../public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
