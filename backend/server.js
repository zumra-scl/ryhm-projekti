const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", require("./users"));
app.use("/reviews", require("./reviews"));
app.use("/recipes", require("./recipes"));

app.use(express.static(path.join(__dirname, "../public")));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
