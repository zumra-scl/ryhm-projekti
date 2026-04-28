const API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

async function loadRecipe() {
  const id = window.location.pathname.split("/").pop();

  const res = await fetch(API_URL + id);
  const data = await res.json();

  const recipe = data.meals[0];

  document.getElementById("recipeDetail").innerHTML = `
    <h1>${recipe.strMeal}</h1>
    <img src="${recipe.strMealThumb}" width="300" />
    <h3>Instructions</h3>
    <p>${recipe.strInstructions}</p>
  `;
}

loadRecipe();
