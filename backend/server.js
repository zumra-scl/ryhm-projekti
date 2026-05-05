const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", require("./users"));

app.use(express.static(path.join(__dirname, "../public")));

const recipesRoutes = require("./recipes");
app.use("/recipes", recipesRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
