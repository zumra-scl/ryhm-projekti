const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./db");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) {
        return res.status(400).json({ error: "User already exists" });
      }

      res.json({
        message: "User registered",
        user: {
          id: this.lastID,
          username,
          email,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "Server error" });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

module.exports = router;
