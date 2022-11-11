import { recipes } from "../data/recipes.js";

/*
 *
 */
export class DataApp {

    // Data
    static recipes = [];
    static ingredients = [];
    static appliances = [];
    static ustensils = [];

    static init() {
        DataApp.recipes = recipes;

        // // Fill data
        // DataApp.recipes.forEach( (recipe) => {

        //     // Fill appliances
        //     const _appliance = recipe.appliance.toLowerCase().trim();
        //     DataApp.appliances.push(_appliance);

        //     // Fill ustensils
        //     recipe.ustensils.forEach ( (ustensil) => {
        //         const _ustensil = ustensil.toLowerCase().trim();
        //         DataApp.ustensils.push(_ustensil);
        //     })

        //     // Fill ingredients
        //     recipe.ingredients.forEach ( (ingredient) => {
        //         const _ingredient = ingredient.ingredient.toLowerCase().trim();
        //         DataApp.ingredients.push(_ingredient);
        //     })

        // });

        DataApp.fillAppliances();
        DataApp.fillUstensils();
    }

    static fillAppliances(){
        const appliances =  DataApp.recipes.map( 
            (recipe) => recipe.appliance.toLowerCase().trim()
        );
        DataApp.appliances = new Set(appliances.sort());
    }

    static fillUstensils(){
        const ustensils =  DataApp.recipes.map( 
            (recipe) => {
                return recipe.ustensils.map( 
                    (ustensil) => ustensil.toLowerCase().trim())
                });

        DataApp.ustensils = new Set(ustensils.flat().sort());
    }

}