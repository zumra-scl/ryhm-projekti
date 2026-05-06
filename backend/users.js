const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./db");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: "User already exists" });
    }

<<<<<<< HEAD
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        error: "Password must contain at least one number",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
=======
    res.json({
      message: "User registered",
      user: {
        id: this.lastID,
        username,
        email,
      },
    });
  });
>>>>>>> 9ed1f3eabf94976aa3a7391262ff63c026c8b216
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, user) => {
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
