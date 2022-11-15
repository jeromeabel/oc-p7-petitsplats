import { Data } from "./data/Data.js";
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";
import { Filters } from "./components/Filters.js";
import { Tags } from "./components/Tags.js";
import { Algo } from "./helpers/Algo.js";

/**
 * Main application
 */
class App {
    constructor() {
        this.data = new Data();
        this.search = new Search();
        this.tags = new Tags();
        this.filters = new Filters(this.data);
        this.recipes = new Recipes();
    }

    init() {
        this.search.render();
        this.filters.render();
        this.recipes.render(Data.RECIPES);
        this.setEvents();
    }

    render(recipes) {
        this.data.update(recipes);
        this.recipes.render(this.data.currentRecipes);
        this.filters.update(this.data);
    }

    setEvents() {
        this.search.$.addEventListener('input', this.searchRecipes.bind(this));

        this.filters.get$()
            .forEach( 
                (input) => input.addEventListener('input', this.filterRecipes.bind(this)
            ));

        // Load filters : add Tag
        document.querySelectorAll('[data-tag-add]')
        .forEach( 
            (filter) => filter.addEventListener('click', this.addTag.bind(this)
        ));


        // document.querySelectorAll('[data-tag-remove]')
        // .forEach( 
        //     (tag) => tag.addEventListener('click', this.removeTag.bind(this)
        // ));
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

    filterRecipes(e) {
        const regexSearch = /^[A-ÿ]{1,}$/; // At least 1 characters
        const searchTerms = e.target.value.toLowerCase().trim();
        const type = e.target.getAttribute("data-input");
        const items = this.data[type];
        let results = [];
        if (searchTerms.length === 0) {
            results = items;
        } else if (regexSearch.test(searchTerms)) {
            results = Algo.findItems(items, searchTerms);
        }

        const filter = this.filters.getFilter(type);
        filter.update(results);
        const elt = filter.get$().parentElement.parentElement;
        elt.querySelectorAll('[data-tag-add')
        .forEach( (tag) => tag.addEventListener('click', this.addTag.bind(this) ))
    }

    addTag(e) {
        const keywords = e.target.textContent;
        const isAdded = this.tags.add(keywords);
        if (isAdded) {

            // Remove callbacks !!!
            const allCloseTags = this.tags.$.querySelectorAll('[data-tag-remove]');
            allCloseTags.forEach( (close) => {
                close.addEventListener('click', (e) => {
                   const keywords = e.target.getAttribute("data-tag-remove");
                   this.tags.remove(keywords);
                   e.target.parentElement.remove();
                   const results = Algo.findRecipesWithTags(this.data.currentRecipes, this.tags.items);
                   if(results.length !== 0) this.render(results)
                })
            }  )

            const results = Algo.findRecipesWithTags(this.data.currentRecipes, this.tags.items);
            if(results.length !== 0) this.render(results)
            else this.render(this.data.currentRecipes());
        }
    }

    removeTag(e) {
        //console.log(e.target);
        //this.tags.remove(e.target.textContent);
    }
}

const app = new App();
app.init();