const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("./db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "All fields required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    db.get(
      `
      SELECT * FROM users
      WHERE email = ?
      `,
      [email],
      async (err, existingUser) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }

        if (existingUser) {
          return res.status(400).json({
            error: "User already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
          `
          INSERT INTO users (username, email, password)
          VALUES (?, ?, ?)
          `,
          [username, email, hashedPassword],
          function (err) {
            if (err) {
              return res.status(500).json({
                error: err.message,
              });
            }

            res.json({
              message: "User registered successfully",
            });
          },
        );
      },
    );
  } catch (err) {
    res.status(500).json({
      error: "Error registering user",
    });
  }
});

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    db.get(
      `
      SELECT * FROM users
      WHERE email = ?
      `,
      [email],
      async (err, user) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        }

        if (!user) {
          return res.status(400).json({
            error: "User not found",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            error: "Wrong password",
          });
        }

        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      },
    );
  } catch (err) {
    res.status(500).json({
      error: "Error logging in",
    });
  }
});

module.exports = router;
