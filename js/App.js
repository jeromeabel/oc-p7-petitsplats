// Import components
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";
import { Filters } from "./components/Filters.js";
import { Tags } from "./components/Tags.js";

// Helpers
import { getNormalizedString, setUniqueValues } from "./helpers/Data.js";
import { Algo } from "./helpers/Algo.js";

// Import all the recipes data
import { RECIPES } from "./data/recipes.js";

class App {

    constructor() {

        // Components
        this.search = new Search();
        this.tags = new Tags();
        this.filters = new Filters();
        this.recipes = new Recipes();

        // Init render
        this.render(RECIPES);

        this.searchEvent();
    }

    // Render DOM : dynamic rendering with new recipes
    // Triggered by these events : searchRecipes, addTag, removeTag 
    render(_recipes){
        this.recipes.render(_recipes); // Update recipes cards DOM
        this.filters.render(_recipes); // Update filters items DOM
        this.addTagsEvents(); // Update filters items : add tags 
    }

    // Find algorithm 
    findRecipes() {
        // Need data from RECIPES, tags, search
        let results = Algo.findRecipesWithSearch(RECIPES, this.searchTerm);
        results = Algo.findRecipesWithTags(results, this.tags.tags);
        //results = setUniqueValues(results);
        return results;
    }

    // ---- SEARCH EVENT ---- //
    searchEvent() { 
        this.search.$input.addEventListener('input', this.searchRecipes.bind(this));
    }

    searchRecipes(e) {
        const regexSearch = /^[A-ÿ]{3,}[A-ÿ\-\s]*$/; // At least 3 characters
        this.searchTerm = getNormalizedString(e.target.value);

        // No characters : show all the recipes
        if (this.searchTerm.length === 0) {
            this.render(RECIPES);
            this.search.hideError();
        } else if (regexSearch.test(this.searchTerm)) {
            // Valid : show the found recipes
            const results = this.findRecipes();
            if(results.length !== 0) {
                this.search.hideError();
                this.render(results);
            } else {
                this.search.showError();
            }
        }
    }

    // ---- ADD TAG EVENT ---- //
    addTagsEvents(){
        const addTagButtons = document.querySelectorAll('button[data-app-event="add-tag"]');
        addTagButtons.forEach( 
            (btn) => btn.addEventListener("click", this.addTag.bind(this)
        ));
    }

    addTag(e) {
        const tag = e.target.getAttribute("data-app-tag");
        const type = e.target.getAttribute("data-app-type");
        const newTagElt = this.tags.add(tag, type);

        if ( newTagElt ) {
            this.removeTagEvent( newTagElt );
            this.render(this.findRecipes());
            //this.$ingredientsInput.value = "";
        }
    }

    // ---- REMOVE TAG EVENT ---- //
    removeTagEvent( _elt ){
        _elt.addEventListener("click", this.removeTag.bind(this));
    }

    removeTag(e) {
        const elt = e.target.closest('button');
        const tag = elt.getAttribute("data-app-tag");
        const type = elt.getAttribute("data-app-type");

        this.tags.remove(tag, type); 
        elt.parentElement.remove();

        this.render(this.findRecipes());
    }
}

const app = new App();