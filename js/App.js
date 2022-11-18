// Import components
import { Search } from "./components/Search.js";
import { Recipes } from "./components/Recipes.js";
import { Filters } from "./components/Filters.js";
import { Tags } from "./components/Tags.js";


// Import all the recipes data
import { RECIPES } from "./data/recipes.js";

class App {

    constructor() {

        // Components
        this.search = new Search();
        this.recipes = new Recipes();
        this.tags = new Tags();
        this.filters = new Filters();

        // Init render
        this.render(RECIPES);

        // Events
        //this.setEvents();
    }

    render(_recipes){
        this.recipes.render(_recipes);
        this.filters.render(_recipes);
        this.updateEvents();
    }

    updateEvents(){
        const addTagButtons = document.querySelectorAll('button[data-app-event="add-tag"]');
        addTagButtons.forEach( 
            (btn) => btn.addEventListener("click", this.addTag.bind(this))
        )
    }

    setRemoveTagsEvent(){
        const removeTagButtons = document.querySelectorAll('button[data-app-event="remove-tag"]');
        console.log(removeTagButtons);
        removeTagButtons.forEach( 
            (btn) => btn.addEventListener("click", this.removeTag.bind(this))
        )
    }

    addTag(e) {
        const tag = e.target.getAttribute("data-app-tag");
        const type = e.target.getAttribute("data-app-type");
        if(this.tags.add(tag, type)) {
            console.log('success');
        }

        //this.update(this.algoFoundRecipes());
        this.setRemoveTagsEvent();
        //this.$ingredientsInput.value = "";
    }

    removeTag(e) {
        console.log(e.target);
        const tag = e.target.getAttribute("data-app-tag");
        const type = e.target.getAttribute("data-app-type");
        this.tags.remove(tag, type); 
        e.target.remove();
        //this.update(this.algoFoundRecipes());
    }



}

const app = new App();