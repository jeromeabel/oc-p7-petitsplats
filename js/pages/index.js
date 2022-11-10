// Import modules
import recipes from "../data/recipes.js";
import Card from "../templates/Card.js";


// Get Data
let currentRecipes = recipes;

function displayRecipes(_recipes){
    const $grid = document.getElementById("grid");
    $grid.innerHTML = "";
    _recipes.map( (recipe) =>  $grid.appendChild(Card.create(recipe)));
}

displayRecipes(recipes);


//console.log(recipes);