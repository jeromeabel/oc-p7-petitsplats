// Algo helpers functions
import { getNormalizedString } from "./Data.js";

// Intersection results between 2 arrays with id
export function getRecipesIntersection( _results1, _results2 ) {
    const foundRecipes = [];
    for (const recipe1 of _results1) {
        for (const recipe2 of _results2) {
            if (recipe1.id === recipe2.id) foundRecipes.push(recipe1);
        }
    }
    return foundRecipes;
}

// Search keywords into the recipes names, descriptions and ingredients
export function findRecipesWithSearch( _recipes, _searchTerm ) {
    let foundRecipes = [];

    if ( _searchTerm.length > 0 ) {

        for (const recipe of _recipes) {
            const isfoundName = findText( recipe.name, _searchTerm );
            const isfoundDescription = findText( recipe.description, _searchTerm );
            const isfoundIngredients = findTextIngredients( recipe.ingredients, _searchTerm );

            if ( isfoundName || isfoundDescription || isfoundIngredients ) {
                foundRecipes.push(recipe);
            }
        }
    } else {
        foundRecipes = _recipes;
    }

    return foundRecipes;
}

// Search tags into the recipes ingredients, ustensils and appliances
export function findRecipesWithTags( _recipes, _tags ) {
    let foundRecipes = [];
    const typesToValid = [];

    // Checks number of tags 
    for ( const type in _tags ) {
        if ( _tags[type].length > 0 ) {
            typesToValid.push(type);
        }
    }

    // If tags are not empty
    if ( typesToValid.length > 0 ) {
        for ( const recipe of _recipes ) {
            let nbIsValid = 0;

            if ( typesToValid.includes("appliances") ) {
                if (findAppliances(recipe.appliance, _tags["appliances"]))  {
                    nbIsValid++;
                }
            }

            if ( typesToValid.includes("ustensils") ) {
                if (findUstensils(recipe.ustensils, _tags["ustensils"]))  {
                    nbIsValid++;
                }
            }

            if ( typesToValid.includes("ingredients") ) {
                if (findIngredients(recipe.ingredients, _tags["ingredients"]))  {
                    nbIsValid++;
                }
            }

            // Check if all tags are in the recipe
            if ( nbIsValid === typesToValid.length ) {
                foundRecipes.push(recipe);
            }
        }
    }  else {
        foundRecipes = _recipes;
    }
    
    return foundRecipes;
}

export function findAppliances( _appliance, _tags) {
    let isValid = false;
    let count = 0;
    const data = _appliance.toLowerCase().trim();
    _tags.forEach((tag) => {
        if (tag === data) count++
    });
    if (count === _tags.length) isValid = true;
    return isValid;
}

export function findUstensils(_ustensils, _tags) {
    let isValid = false;
    let count = 0;
    _ustensils.forEach((ustensil) => {
        const data = ustensil.toLowerCase().trim();
        _tags.forEach((tag) => {
            if (tag === data) count++
        })
    });
    if (count === _tags.length) isValid = true;
    return isValid;
}

export function findIngredients(_ingredients, _tags) {
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

export function findItems(items, searchTerm) {
    const results = [];
    for (let item of items) {
        if (item.includes(searchTerm)) {
            results.push(item);
        }
    }
    return results;
}

export function findText( _text, _search ) {
    const text = getNormalizedString( _text );
    const search = getNormalizedString( _search );
    return text.includes(search);
}

export function findTextIngredients( _ingredients, _search) {
    let isFound = false;
    for ( let ingredient of _ingredients ) {
        if ( findText( ingredient.ingredient, _search ) ) isFound = true;
    }
    return isFound;
}