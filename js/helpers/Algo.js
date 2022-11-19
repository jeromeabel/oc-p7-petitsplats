import { Recipes } from "../components/Recipes.js";
import { getNormalizedString, getRecipesByType } from "../helpers/Data.js";

export class Algo {

    static getRecipesIntersection( _results1, _results2) {
        let foundRecipes = [];
        for ( const recipe1 of _results1 )  {
            for ( const recipe2 of _results2 )  {
                if ( recipe1.id === recipe2.id ) foundRecipes.push(recipe1);
            }
        }
        return foundRecipes;
    }

    // Search keywords into the recipes names, descriptions and ingredients
    static findRecipesWithSearch(_recipes, _searchTerm) {
        let foundRecipes = [];
        //const searchTerm =  getNormalizedString(_searchTerm);
        //const searchTerm = _searchTerm.toLowerCase().trim();

        if (_searchTerm.length > 0) {
            for (const recipe of _recipes) {
                const name = recipe.name.toLowerCase().trim();
                const description = recipe.description.toLowerCase().trim();
                if (name.includes(_searchTerm)) {
                    foundRecipes.push(recipe);
                } else if (description.includes(_searchTerm)) {
                    foundRecipes.push(recipe);
                } else {
                    for (let ingredient of recipe.ingredients) {
                        const ingName = ingredient.ingredient.toLowerCase().trim();
                        if (ingName.includes(_searchTerm)) {
                            foundRecipes.push(recipe);
                        }
                    }
                }
            }
        }
        else {
            foundRecipes = _recipes;
        }
        return foundRecipes;
    }

    // Search recipes with tags
    static findRecipesWithTags(_recipes, _tags) {
        let foundRecipes = [];

        for (const recipe of _recipes) {
            let nbTypesToValid = 0;
            let nbIsValid = 0;

            if (_tags["appliances"].length > 0) {
                nbTypesToValid++;
                if (Algo.findAppliances(recipe.appliance, _tags["appliances"])) {
                    nbIsValid++;
                }
            }

            if (_tags["ustensils"].length > 0) {
                nbTypesToValid++;
                if (Algo.findUstensils(recipe.ustensils, _tags["ustensils"])) {
                    nbIsValid++;
                }
            }

            if (_tags["ingredients"].length > 0) {
                nbTypesToValid++;
                if (Algo.findIngredients(recipe.ingredients, _tags["ingredients"])) {
                    nbIsValid++;
                }
            }

            // If all types to valid is equal to the validated nb : the recipe is found
            if ( nbTypesToValid > 0 && nbTypesToValid === nbIsValid ) {
                foundRecipes.push(recipe);
            }
        }

        if (foundRecipes.length === 0) {
            foundRecipes = _recipes;
        }

        return foundRecipes;
    }

    static findAppliances(_appliance, _tags) {
        let isValid = false;
        let count = 0;
        const data = _appliance.toLowerCase().trim();
        _tags.forEach((tag) => {
            if (tag === data) count++
        });
        if (count === _tags.length) isValid = true;
        return isValid;
    }

    static findUstensils(_ustensils, _tags) {
        let isValid = false;
        let count = 0;
        _ustensils.forEach((ustensil) => {
            const data = ustensil.toLowerCase().trim();
            _tags.forEach((tag) => {
                if (tag === data) count++
            })
        });
        if (count === _tags.length) isValid = true;
        return isValid;;
    }


    static findIngredients(_ingredients, _tags) {
        let isValid = false;
        let count = 0;
        _ingredients.forEach((ingredient) => {
            const data = ingredient.ingredient.toLowerCase().trim();
            _tags.forEach((tag) => {
                if (tag === data) count++
            })
        });
        if (count === _tags.length) isValid = true;

        return isValid;
    }

    static findItems(items, searchTerm) {
        let results = [];
        for (let item of items) {
            if (item.includes(searchTerm)) {
                results.push(item);
            }
        }
        return results;
    }
}