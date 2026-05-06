const express = require("express");
const router = express.Router();

let reviews = [];

router.post("/", (req, res) => {
  const { recipeId, rating, comment, user } = req.body;

  if (!recipeId || !rating) {
    return res.status(400).json({ error: "Recipe and rating required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be 1-5" });
  }

  const newReview = {
    id: Date.now(),
    recipeId,
    user: user || "anonymous",
    rating,
    comment: comment || "",
    date: new Date(),
  };

  reviews.push(newReview);

  res.json({ message: "Review added", review: newReview });
});

router.get("/:recipeId", (req, res) => {
  const recipeReviews = reviews.filter(
    (r) => r.recipeId === req.params.recipeId,
  );

  res.json(recipeReviews);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = reviews.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Review not found" });
  }

  reviews.splice(index, 1);

  res.json({ message: "Review deleted" });
});

module.exports = router;
