import { Data } from "./data/Data.js";
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";
import { Filter } from "./components/Filter.js";
import { Algo } from "./helpers/algov1.js";

/**
 * Main application
 */
const app = () => {
    // Get Data
    const data = new Data();

    // Render components
    const search = new Search();
    //new Filter('ingredients', data.ingredients).render();
    const recipes = new Recipes(data.recipes);


    // Main search
    search.getElement().addEventListener('input', (e) => {
        // Regex : Greater than 3 characters
        const regexSearch = /^[A-ÿ]{3,}[A-ÿ\-\s]*$/;
        const searchTerms = e.target.value.toLowerCase().trim();
        if (searchTerms.length === 0) {
            recipes.update(data.recipes);
        } else if (regexSearch.test(searchTerms)) {
            const foundRecipes = Algo.findRecipes(data.recipes, searchTerms);
            data.update(foundRecipes);
            recipes.update(foundRecipes);
        }
    })

};

document.addEventListener("DOMContentLoaded", app);