// Import modules
import recipes from "../data/recipes.js";
import Card from "../templates/Card.js";
import Tag from "../templates/Tag.js";

class Index {

    constructor(_recipes){
        // DOM
        this.$searchInput = document.getElementById("search");
        this.$wrapperHelpMessage = document.getElementById("message");
        this.$wrapperRecipes = document.getElementById("grid");
        this.$wrapperTags = document.getElementById("tags");

        // Data
        this.recipes = _recipes;
        this.currentRecipes = _recipes;
        this.ingredients = [];
        this.ustensils = [];
        this.appliances = [];
    }

    setTags() {
        for (let recipe of this.currentRecipes) {
            this.appliances.push(recipe.appliance);

            for (let ingredient of recipe.ingredients) {
                this.ingredients.push(ingredient.ingredient);
            }

            for (let ustensil of recipe.ustensils) {
                this.ustensils.push(ustensil);
            }
        }
    }

    displayTags(){
        this.$wrapperTags.appendChild(Tag.create("Ingredients", this.ingredients));
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
                    that.displayHelpMessage();
                    return;
                }

                that.hideHelpMessage();
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

    displayHelpMessage() {
        this.$wrapperHelpMessage.classList.replace("d-none", "d-block");
        const msg = `
                    <i class="bi bi-exclamation-circle"></i> 
                    Aucune recette ne correspond à votre recherche ...
                    Veuillez essayer "Soupe", "Tarte", ...`
        this.$wrapperHelpMes
        /*
        <ul class="dropdown-menu bg-primary" aria-labelledby="filter1">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
        */sage.innerHTML = msg;
    }

    hideHelpMessage() {
        this.$wrapperHelpMessage.classList.replace("d-block", "d-none");
    }

    displayCurrentRecipes() {
        this.$wrapperRecipes.innerHTML = "";
        this.currentRecipes.map( (recipe) => this.$wrapperRecipes.appendChild(Card.create(recipe)));
    }

    main() {
        this.displayCurrentRecipes();
        this.setListeners();
        this.setTags();
        this.displayTags();
    }
}

const index = new Index(recipes);
index.main();