let allRecipes = [];

async function fetchRecipes() {
  try {
    const res = await fetch("/recipes");
    const data = await res.json();

    console.log("DATA:", data);

    allRecipes = data;
    renderRecipes(allRecipes);
  } catch (err) {
    console.log("Error:", err);
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById("recipeList");
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${recipe.strMealThumb}" width="150"/>
      <h3>${recipe.strMeal}</h3>
      <button onclick="openRecipe('${recipe.idMeal}')">View</button>
    `;

    container.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allRecipes.filter((r) =>
    r.strMeal.toLowerCase().includes(value),
  );

  renderRecipes(filtered);
});

function openRecipe(id) {
  window.location.href = `/recipe.html?id=${id}`;
}

fetchRecipes();
