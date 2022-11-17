// Import components
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";
import { Filters } from "./components/Filters.js";

// Import all the recipes data
import { RECIPES } from "./data/recipes.js";

class App {

    constructor() {

        // Components
        this.search = new Search();
        this.recipes = new Recipes();
        //this.tags = new Tags();
        this.filters = new Filters();

        // Init render
        this.render(RECIPES);

        // Events
        //this.setEvents();
    }

    render(_recipes){
        this.recipes.render(_recipes);
        this.filters.render(_recipes);
    }


}

const app = new App();