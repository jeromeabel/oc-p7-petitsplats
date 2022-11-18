import { Recipes } from "../components/Recipes.js";
import { getNormalizedString, getRecipesByType } from "../helpers/Data.js";

export class Algo {

    // Search keywords into the recipes names, descriptions and ingredients
    static findRecipesWithSearch(_recipes, _searchTerm) {
        let foundRecipes = [];
        //const searchTerm =  getNormalizedString(_searchTerm);

        for (const recipe of _recipes) {
            const name = getNormalizedString(recipe.name);
            const description = getNormalizedString(recipe.description);
            if (name.includes(_searchTerm)) {
                foundRecipes.push(recipe);
            } else if (description.includes(_searchTerm)) {
                foundRecipes.push(recipe);
            } else {
                for (let ingredient of recipe.ingredients) {
                    const ingName =  getNormalizedString(ingredient.ingredient);
                    if (ingName.includes(_searchTerm)) {
                        foundRecipes.push(recipe);
                    }
                }
            }
        }
        return foundRecipes;
    }

    static findText(_data, _search) {
        const data = getNormalizedString(new String(_data));
        const search = getNormalizedString(new String(_search));
        return data.includes(search);
    }

    static findRecipesWithTags(_recipes, _tags) {
        let foundRecipes = [];

        // Look though each type
        // Find if all the tags are in the current recipe type
        // Then add it to the results

        const length = _tags['appliances'].length + _tags['ustensils'].length + _tags['ingredients'].length;

        if (length > 0) {
            for (const recipe of _recipes) {

                // Appliances
                if (_tags['appliances'].length > 0) {
                    for (const tag of _tags['appliances']) {
                        let count = 0;
                        const data = recipe.appliance.toLowerCase().trim();
                        if (data === tag.toLowerCase().trim()) count++
                        if (count === _tags['appliances'].length) {
                            foundRecipes.push(recipe);
                        }
                    }
                }

                // Ustensils
                if (_tags['ustensils'].length > 0) {
                    for (const tag of _tags['ustensils']) {
                        let count = 0;
                        recipe.ustensils.forEach((ustensil) => {
                            const data = ustensil.toLowerCase()
                            if (data === tag.toLowerCase().trim()) count++
                        })
                        if (count === _tags['ustensils'].length) {
                            foundRecipes.push(recipe);
                        }
                    }
                }

                // Ingredients
                if (_tags['ingredients'].length > 0) {
                    for (const tag of _tags['ingredients']) {
                        let count = 0;
                        recipe.ingredients.forEach((ingredient) => {
                            const data = ingredient.ingredient.toLowerCase();
                            if (data === tag) count++
                        })
                        if (count === _tags['ingredients'].length) {
                            foundRecipes.push(recipe);
                        }
                    }
                }
            }
        } else {
            foundRecipes = _recipes;
        }

        return foundRecipes;
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