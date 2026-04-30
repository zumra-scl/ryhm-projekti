const API_URL = "http://localhost:3000/recipes";

const list = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const form = document.getElementById("search-form");
const categorySelect = document.getElementById("categorySelect");

let allMeals = [];

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

  meals.forEach((meal) => {
    list.innerHTML += `
      <div>
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" width="120" />
        <br/>
        <a href="recipe.html?id=${meal.idMeal}">view</a>
      </div>
      <hr/>
    `;
  });
}

async function searchMeals(query) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );

  const data = await res.json();
  renderMeals(data.meals || []);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  const category = categorySelect.value;

  if (query) {
    searchMeals(query);
    return;
  }

  // category varsa
  if (category) {
    loadCategory(category);
    return;
  }

  renderMeals(allMeals);
});

async function loadCategory(category) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );

  const data = await res.json();
  renderMeals(data.meals || []);
}

loadMeals();
