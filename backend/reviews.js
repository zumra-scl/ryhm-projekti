const express = require("express");
const router = express.Router();

const db = require("./db");

router.get("/average/:recipeId", (req, res) => {
  db.get(
    `
    SELECT AVG(rating) as averageRating,
           COUNT(*) as totalReviews
    FROM reviews
    WHERE recipeId = ?
    `,
    [req.params.recipeId],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        recipeId: req.params.recipeId,
        averageRating: Number(row.averageRating || 0).toFixed(1),
        totalReviews: row.totalReviews,
      });
    },
  );
});

router.post("/", (req, res) => {
  const { recipeId, rating, comment, user } = req.body;

  if (!recipeId || !rating) {
    return res.status(400).json({
      error: "Recipe and rating required",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      error: "Rating must be 1-5",
    });
  }

  const date = new Date().toISOString();

  db.run(
    `
    INSERT INTO reviews (recipeId, user, rating, comment, date)
    VALUES (?, ?, ?, ?, ?)
    `,
    [recipeId, user || "anonymous", rating, comment || "", date],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Review added",
        review: {
          id: this.lastID,
          recipeId,
          user,
          rating,
          comment,
          date,
        },
      });
    },
  );
});

router.get("/:recipeId", (req, res) => {
  db.all(
    `
    SELECT * FROM reviews
    WHERE recipeId = ?
    ORDER BY id DESC
    `,
    [req.params.recipeId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    },
  );
});

router.delete("/:id", (req, res) => {
  db.run(
    `
    DELETE FROM reviews
    WHERE id = ?
    `,
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }

      res.json({
        message: "Review deleted",
      });
    },
  );
});

module.exports = router;
