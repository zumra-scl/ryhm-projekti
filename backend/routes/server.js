const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const recipesRoutes = require("./routes/recipes");
app.use("/recipes", recipesRoutes);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is working");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
