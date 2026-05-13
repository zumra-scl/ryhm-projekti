const API_URL = "http://localhost:3000/recipes";

let allMeals = [];

const list = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const form = document.getElementById("search-form");

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function getFavKey() {
  const user = getUser();
  return `favs_${user?.id || "guest"}`;
}

function getFavs() {
  const key = getFavKey();
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveFavs(favs) {
  const key = getFavKey();
  localStorage.setItem(key, JSON.stringify(favs));
}

function getRandomRating() {
  return (Math.random() * 2 + 3).toFixed(1);
}

async function loadMeals() {
  const res = await fetch(API_URL);
  const data = await res.json();

  allMeals = data;
  renderMeals(allMeals);
}

function renderMeals(meals) {
  list.innerHTML = "";

  if (!meals || meals.length === 0) {
    list.innerHTML = "<p>No recipes found</p>";
    return;
  }

  const favs = getFavs();

  meals.forEach((meal) => {
    const isFav = favs.find((f) => f.id === meal.idMeal);

    list.innerHTML += `
      <div class="card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>

        <div class="rating">
          ⭐ ${getRandomRating()} / 5
        </div>

        <div class="button-row">
          <a class="button" href="recipe.html?id=${meal.idMeal}">
            View recipe
          </a>
          <button
            class="button"
            data-id="${meal.idMeal}"
            onclick="addToFav('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')"
            ${isFav ? "disabled" : ""}
          >
            ${isFav ? "Added" : "❤️ Add to favourites"}
          </button>
        </div>
      </div>
    `;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSearch(searchInput.value.trim());
});

searchInput.addEventListener("input", (e) => {
  handleSearch(e.target.value.trim());
});

async function handleSearch(value) {
  if (!value) {
    renderMeals(allMeals);
    return;
  }

  const resIng = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`,
  );
  const dataIng = await resIng.json();

  if (dataIng.meals) {
    renderMeals(dataIng.meals);
    return;
  }

  const resName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
  );
  const dataName = await resName.json();

  renderMeals(dataName.meals || []);
}

categorySelect.addEventListener("change", async (e) => {
  const cat = e.target.value;

  if (!cat) {
    renderMeals(allMeals);
    return;
  }

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`,
  );

  const data = await res.json();

  renderMeals(data.meals || []);
});

function addToFav(id, name, img) {
  const user = getUser();

  if (!user) {
    alert("You must be logged in");
    return;
  }

  let favs = getFavs();

  const exists = favs.find((f) => f.id === id);

  if (exists) return;

  favs.push({ id, name, img });

  saveFavs(favs);

  const btn = document.querySelector(`button[data-id="${id}"]`);
  if (btn) {
    btn.innerText = "Added";
    btn.disabled = true;
  }
}

loadMeals();
