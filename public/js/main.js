const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let allRecipes = [];

async function fetchRecipes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allRecipes = data.meals;
    renderRecipes(allRecipes);
  } catch (err) {
    console.log("API error:", err);
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById("recipeList");
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${recipe.strMealThumb}" width="150" />
      <h3>${recipe.strMeal}</h3>
      <button onclick="openRecipe('${recipe.idMeal}')">View</button>
    `;

    container.appendChild(div);
  });
}

function openRecipe(id) {
  window.location.href = `/recipe/${id}`;
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allRecipes.filter((r) =>
    r.strMeal.toLowerCase().includes(value),
  );

  renderRecipes(filtered);
});

fetchRecipes();
