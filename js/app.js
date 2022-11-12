import { Data } from "./data/Data.js";
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";

/**
 * Main application
 */
const app = () => {
    // Get Data
    const data = new Data();

    // Render components
    new Search().render();
    //new Filter('ingredients', data.ingredients).render();
    new Recipes(data.recipes).render();
};

document.addEventListener("DOMContentLoaded", app);