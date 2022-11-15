import { recipes } from "./data/recipes.js";
import { Data } from "./helpers/Data.js";

const RECIPES = recipes;

class App {

    constructor() {
        this.setDOM();
        this.update(RECIPES);
        this.render();
        this.setEvents();

        this.tags = [];
        this.searchTerm = "";
        this.ingredientsSearchTerm = "";
    }

    setDOM() {
        // SEARCH
        this.$searchWrapper = document.querySelector('section[data-wrapper="search"]');

        // TAGS
        this.$tagsWrapper = document.querySelector('section[data-wrapper="tags"]');
        this.$tagsUl = this.$tagsWrapper.querySelector('ul');

        // RECIPES
        this.$recipesWrapper = document.querySelector('section[data-wrapper="recipes"]');
        this.$recipesUl = this.$recipesWrapper.querySelector('ul');

        // FILTERS
        this.$ingredientsWrapper = document.querySelector('div[data-wrapper="ingredients"]');
        this.$ingredientsBody = this.$ingredientsWrapper.querySelector('div[data-wrapper="ingredients-body"]');
        this.$ingredientsUl = this.$ingredientsBody.querySelector('ul');
    
        // INPUTS
        this.$searchInput = this.$searchWrapper.querySelector('input');
        this.$ingredientsInput = this.$ingredientsWrapper.querySelector('input');
    }

    setEvents(){
        this.$searchInput.addEventListener( 'input' , this.searchRecipes.bind(this));
        this.$ingredientsInput.addEventListener( 'input' , this.searchIngredients.bind(this));
    }

    update(recipes) {
        this.recipes = recipes;
        this.ingredients = Data.getIngredients2(recipes);
        this.render();
    }

    render() {
        this.renderIngredients(this.ingredients);
        this.renderRecipes();
        this.setIngredientsEvent();
    }

    searchRecipes(e){
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.update(this.algoFoundRecipes());
    }

    searchIngredients(e) {
        const search = e.target.value.toLowerCase().trim();
        const regexSearch = /^[A-ÿ]{1,}$/; // At least 1 characters

        let results = [];
        if (search.length === 0) {
            results = this.ingredients;
        } else if (regexSearch.test(search)) {
            for (let ingredient of this.ingredients) {    
                if (ingredient.includes(search)) {
                    results.push(ingredient);
                }
            }
        }
        this.renderIngredients(results);
        this.setIngredientsEvent();
    }

    algoFoundRecipes() {
        // Data : RECIPES, searchTerm, Tags
        let foundRecipes = [];
        const search = this.searchTerm;
        const allRecipes = RECIPES;
        const tags = this.tags;
        //const names = Data.getNames(recipes);
        //const ingredients = Data.getIngredients(recipes);

        for (let recipe of allRecipes) {
            const name = recipe.name.toLowerCase().trim();    
            if (name.includes(search)) {
                foundRecipes.push(recipe);
            }
            for (let ingredient of recipe.ingredients) {
                const ingredientName = ingredient.ingredient.toLowerCase().trim();
                if (ingredientName.includes(search)) {
                    foundRecipes.push(recipe);
                }
            }
        }

        let foundRecipes2 = [];
        
        // Test if all tags are in the ingredients
        if (tags.length > 0) {
            //const ingredients = Data.getIngredients(foundRecipes);
            for (let recipe of foundRecipes) {
                let count = 0;
                recipe.ingredients.forEach( (ingredient) => {
                    const ingredientName = ingredient.ingredient.toLowerCase().trim();
                    tags.forEach( (tag) => {
                        if (tag === ingredientName) count++
                    })
                });
                if(count === tags.length) foundRecipes2.push(recipe); 
            }
        } else {
            foundRecipes2 = foundRecipes;
        }

        return new Set(foundRecipes2.sort());
    }

    renderRecipes(){
        let html = ""
        for (let recipe of this.recipes) {
            html += `<li>${recipe.name}</li>`; 
        }
        this.$recipesUl.innerHTML = html;
    }

    renderIngredients(ingredients){
        let html = ""
        for (let ingredient of ingredients) {
            html += `<li>${ingredient}</li>`; 
        }
        this.$ingredientsUl.innerHTML = html;
    }

    setIngredientsEvent() {
        this.$ingredientsUl.querySelectorAll('li')
        .forEach( 
            (li) => li.addEventListener("click", this.addTag.bind(this)
        ));
    }

    addTag(e) {
        const tag = e.target.textContent.toLowerCase().trim();

        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
            const html = `<li>${tag}</li>`;
            this.$tagsUl.insertAdjacentHTML("beforeend", html);
        }

        this.update(this.algoFoundRecipes());
        this.setRemoveTagsEvent();
        this.$ingredientsInput.value = "";
    }

    setRemoveTagsEvent(){
        this.$tagsUl.querySelectorAll('li')
        .forEach( 
            (li) => li.addEventListener("click", this.removeTag.bind(this)
        ));
    }

    removeTag(e) {
        const tag = e.target.textContent.toLowerCase().trim();
        this.tags = this.tags.filter( t => t !== tag);
        e.target.remove();
        this.update(this.algoFoundRecipes());
    }

    
}

const app = new App();