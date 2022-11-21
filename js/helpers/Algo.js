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
        const searchTerm = getNormalizedString( _searchTerm );

        foundRecipes = _recipes.filter( recipe => {
            const isFoundName = getNormalizedString( recipe.name ).includes( searchTerm );
            const isFoundAppliance = getNormalizedString( recipe.description ).includes( searchTerm );
            const ingArray = recipe.ingredients.map( ing => getNormalizedString( ing.ingredient ));
            const isFoundIngredients = ingArray.includes( searchTerm );
            return isFoundName || isFoundAppliance || isFoundIngredients;
        });

    } else {
        foundRecipes = _recipes; // Reset
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
    if (typesToValid.length > 0) {
        for (const recipe of _recipes) {
            let nbIsValid = 0;

            // Find tags according to the type
            for (const type of typesToValid) {
                if (findTags(recipe, _tags[type], type)) nbIsValid++;
            }

            // Check if all tags are in the recipe
            if ( nbIsValid === typesToValid.length ) {
                foundRecipes.push(recipe);
            }
        }
    }  else {
        foundRecipes = _recipes; // Reset
    }
    
    return foundRecipes;
}


// Check tags and types of the recipe
function findTags(_recipe, _tags, _type) {
    let isValid = false;
    let count = 0;

    if ( _type === "appliances" ) {
        const data = _recipe.appliance.toLowerCase().trim();
        _tags.forEach((tag) => {
            if (tag === data) count++
        })
    } else if ( _type === "ustensils" ) {
        _recipe.ustensils.forEach((ustensil) => {
            const data = ustensil.toLowerCase().trim();
            _tags.forEach((tag) => {
                if (tag === data) count++
            })
        });
    } else if ( _type === "ingredients" ) {
        _recipe.ingredients.forEach((ingredient) => {
            const data = ingredient.ingredient.toLowerCase().trim();
            _tags.forEach((tag) => {
                if (tag === data) count++
            })
        });
    }
   
    // Check if all the tags (ingredients, ustensils, appliances) are in the recipe
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