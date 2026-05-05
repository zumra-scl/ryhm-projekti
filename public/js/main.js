const API_URL = "http://localhost:3000/recipes";

let allMeals = [];

const list = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const recipeList = document.getElementById("recipeList");

meals.forEach((meal) => {
  recipeList.innerHTML += `
    <div class="card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
      <a class="button" href="recipe.html?id=${meal.idMeal}">
        View recipe
      </a>
    </div>
  `;
});
async function loadMeals() {
  const res = await fetch(API_URL);
  const data = await res.json();

  allMeals = data;
  renderMeals(allMeals);
}

function renderMeals(meals) {
  list.innerHTML = "";

  meals.forEach((meal) => {
    list.innerHTML += `
      <div>
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" width="100"/>
        <a href="recipe.html?id=${meal.idMeal}">view</a>
      </div>
    `;
  });
}

searchInput.addEventListener("input", async (e) => {
  const value = e.target.value.trim();

  if (!value) {
    renderMeals(allMeals);
    return;
  }

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
  );

  const data = await res.json();

  renderMeals(data.meals || []);
});

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

loadMeals();
