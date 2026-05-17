const API_URL = "http://localhost:3000/recipes/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("recipeDetail");
const reviewsList = document.getElementById("reviewsList");

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

async function loadRecipe() {
  const res = await fetch(API_URL + id);
  const recipe = await res.json();

  container.innerHTML = `
    <h1>${recipe.strMeal}</h1>
    <img src="${recipe.strMealThumb}" width="300"/>
    <p>${recipe.strInstructions}</p>
  `;

  loadReviews();
  loadAverage();
}

loadRecipe();

async function loadAverage() {
  const res = await fetch(`http://localhost:3000/reviews/average/${id}`);

  const data = await res.json();

  document.getElementById("avgRating").innerHTML = `
    ⭐ ${data.averageRating} / 5 (${data.totalReviews})
  `;
}

const starRating = document.getElementById("starRating");
const ratingInput = document.getElementById("rating");
let currentRating = 1;

function updateStars(rating) {
  const stars = starRating.querySelectorAll(".star");
  stars.forEach((star, idx) => {
    if (idx < rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

starRating.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("star")) {
    const val = Number(e.target.getAttribute("data-value"));
    updateStars(val);
  }
});

starRating.addEventListener("mouseout", () => {
  updateStars(currentRating);
});

starRating.addEventListener("click", (e) => {
  if (e.target.classList.contains("star")) {
    const val = Number(e.target.getAttribute("data-value"));
    currentRating = val;
    ratingInput.value = val;
    updateStars(currentRating);
  }
});

updateStars(currentRating);

document.getElementById("submitReview").addEventListener("click", async (e) => {
  e.preventDefault();

  const user = getUser();

  if (!user) {
    alert("You must be logged in");
    return;
  }

  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  await fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeId: id,
      rating: Number(rating),
      comment,
      user: user.username,
    }),
  });

  document.getElementById("comment").value = "";
  currentRating = 1;
  ratingInput.value = 1;
  updateStars(currentRating);

  loadReviews();
  loadAverage();
});

async function loadReviews() {
  const res = await fetch(`http://localhost:3000/reviews/${id}`);
  const reviews = await res.json();

  const currentUser = getUser();

  reviewsList.innerHTML = "<h3>Reviews</h3>";

  reviews.forEach((r) => {
    const isOwner = currentUser && currentUser.username === r.user;

    reviewsList.innerHTML += `
      <div class="review">
        <p><b>${r.user}</b></p>
        <p>${"⭐".repeat(r.rating)}</p>
        <p>${r.comment}</p>

        ${
          isOwner
            ? `<button onclick="deleteReview(${r.id})">Delete</button>`
            : ""
        }
      </div>
    `;
  });
}

async function deleteReview(reviewId) {
  await fetch(`http://localhost:3000/reviews/${reviewId}`, {
    method: "DELETE",
  });

  loadReviews();
  loadAverage();
}
