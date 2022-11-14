import { Data } from "./data/Data.js";
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";
import { Filters } from "./components/Filters.js";
import { Algo } from "./helpers/Algo.js";

/**
 * Main application
 */
class App {
    constructor() {
        this.data = new Data();
        this.search = new Search();
        //this.tags = new Tags();
        this.filters = new Filters();
        this.recipes = new Recipes();
    }

    init() {
        this.search.render();
        this.filters.render(this.data);
        this.recipes.render(Data.RECIPES);
        this.setEvents();
    }

    render(recipes) {
        this.data.update(recipes);
        this.recipes.render(this.data.currentRecipes);
    }

    setEvents() {
        this.search.$.addEventListener('input', this.searchRecipes.bind(this));
    }

    // ----- Callback Functions ------ //
    searchRecipes(e) {
        const regexSearch = /^[A-ÿ]{3,}[A-ÿ\-\s]*$/; // At least 3 characters
        const searchTerms = e.target.value.toLowerCase().trim();
        // No characters : show all the recipes
        if (searchTerms.length === 0) {
            this.render(Data.RECIPES);
            this.search.hideError();
        } else if (regexSearch.test(searchTerms)) {
            // Valid : show the found recipes
            const results = Algo.findRecipes(Data.RECIPES, searchTerms);
            if(results.length !== 0) this.render(results)
            else this.search.showError();
        }
    }
}

const app = new App();
app.init();