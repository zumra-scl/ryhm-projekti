const API_URL = "http://localhost:3000/recipes/";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const container = document.getElementById("recipeDetail");

async function loadRecipe() {
  const res = await fetch(API_URL + id);
  const recipe = await res.json();

  container.innerHTML = `
    <h1>${recipe.strMeal}</h1>
    <img src="${recipe.strMealThumb}" width="300"/>
    <p>${recipe.strInstructions}</p>
  `;
}

loadRecipe();
