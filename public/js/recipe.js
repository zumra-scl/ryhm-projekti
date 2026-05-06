const API_URL = "http://localhost:3000/recipes/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("recipeDetail");
const reviewsList = document.getElementById("reviewsList");

async function loadRecipe() {
  const res = await fetch(API_URL + id);
  const recipe = await res.json();

  container.innerHTML = `
    <h1>${recipe.strMeal}</h1>
    <img src="${recipe.strMealThumb}" width="300"/>
    <p>${recipe.strInstructions}</p>
  `;

  loadReviews();
}

loadRecipe();

function requireLogin() {
  const user = getUser();

  if (!user) {
    alert("You must be logged in to review");
    return null;
  }

  return user;
}

document.getElementById("submitReview").addEventListener("click", async () => {
  const user = requireLogin();
  if (!user) return;

  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  await fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeId: id,
      rating,
      comment,
      user: user.username,
    }),
  });

  document.getElementById("comment").value = "";

  loadReviews();
});

async function loadReviews() {
  const res = await fetch(`http://localhost:3000/reviews/${id}`);
  const reviews = await res.json();

  reviewsList.innerHTML = "<h3>Reviews</h3>";

  if (reviews.length === 0) {
    reviewsList.innerHTML += "<p>No reviews yet</p>";
    return;
  }

  reviews.forEach((r) => {
    reviewsList.innerHTML += `
      <div class="review">
        <p><b>${r.user}</b></p>
        <p>${"⭐".repeat(r.rating)}</p>
        <p>${r.comment}</p>
      </div>
    `;
  });
}
