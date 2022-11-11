// Import modules
import recipes from "../data/recipes.js";
import Card from "../templates/Card.js";

class Index {

    constructor(_recipes){
        // DOM
        this.$wrapperRecipes = document.getElementById("grid");
        this.$searchInput = document.getElementById("search");

        // Data
        this.recipes = _recipes;
        this.currentRecipes = _recipes;
    }

    setListeners() {
        const that = this;

        // Search Recipes
        this.$searchInput.addEventListener("input", (e) => {
            
            // Regex : Greater than 3 characters
            const regexChar = /^[A-ÿ]{3,}[A-ÿ\-\s]*$/;
            const searchTerms = e.target.value.toLowerCase().trim();

            if (regexChar.test(searchTerms)) {
                that.currentRecipes = that.getCurrentRecipes(searchTerms);
        
                // No founded recipes
                if (that.currentRecipes.length === 0 ) {
                    that.displayMessage("Aucune recette ne correspond à votre recherche ...");
                    return;
                }

                that.displayMessage("");
                that.displayCurrentRecipes();
            }
        });
    }

    getCurrentRecipes(searchTerms) {
        // Méthode avec "for"
        let foundRecipes = [];
    
        for (let recipe of this.recipes) {
            const name = recipe.name.toLowerCase().trim();
            const description = recipe.description.toLowerCase().trim();
    
            if (name.includes(searchTerms)) { // Name
                foundRecipes.push(recipe);
            } else if (description.includes(searchTerms)) { // Description
                foundRecipes.push(recipe);
            } else {
                for (let ingredient of recipe.ingredients) { // Ingrédients
                    const ingredientName = ingredient.ingredient.toLowerCase().trim();
                    if (ingredientName.includes(searchTerms)) {
                        foundRecipes.push(recipe);
                    }
                }
            }
        }
    
        return foundRecipes;
    }

    displayMessage(msg) {
        console.log(msg);
    }

    displayCurrentRecipes() {
        this.$wrapperRecipes.innerHTML = "";
        this.currentRecipes.map( (recipe) => this.$wrapperRecipes.appendChild(Card.create(recipe)));
    }

    main() {
        this.displayCurrentRecipes();
        this.setListeners();
    }
}

const index = new Index(recipes);
index.main();