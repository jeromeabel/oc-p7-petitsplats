import { recipes } from "./recipes.js";

/*
 * 
 */

export class Data {

    //static RECIPES = []

    constructor() {
        Data.RECIPES = recipes;
        //this.initRecipes = recipes;
        this.currentRecipes = [];
        this.update(Data.RECIPES);
    }

    update(_recipes) {
        this.currentRecipes = [..._recipes];
        this.ingredients = this.getIngredients(this.currentRecipes) ;
        this.appliances = this.getAppliances(this.currentRecipes);
        this.ustensils = this.getUstensils(this.currentRecipes);
    }

    getAppliances(_recipes){
        const appliances = _recipes.map( 
            (recipe) => recipe.appliance.toLowerCase().trim()
        );
        return new Set(appliances.sort());
    }

    getUstensils(_recipes){
        const ustensils = _recipes.map( 
            (recipe) => {
                return recipe.ustensils.map( 
                    (ustensil) => ustensil.toLowerCase().trim())
                });
        return new Set(ustensils.flat().sort());
    }

    getIngredients(_recipes){
        const ingredients = _recipes.map( 
            (recipe) => {
                return recipe.ingredients.map( 
                    (ingredient) => ingredient.ingredient.toLowerCase().trim())
                });
        return new Set(ingredients.flat().sort());
    }
}