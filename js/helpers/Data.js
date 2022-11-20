// Helpers functions

// Remove accents and uppercase
export function getNormalizedString(_str) {
    return _str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    //return _str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

// Capitalize first letter
export function capitalizeFirstChar(_str) {
    return _str.charAt(0).toUpperCase() + _str.slice(1)
}

// Get formatted data by types : ingredients, appliances, ustensils
export function getRecipesByType(_recipes, type) {

    switch(type) {
        case "ingredients" : 
            return getIngredients(_recipes);
            break;
        case "ustensils" :
            return getUstensils(_recipes);
            break;
        case "appliances" :
            return getAppliances(_recipes);
            break;
        default:
            console.log("An error occurs during formating Data");
            break;
    }
}

// Extract unique appliances from the recipes sort with accents
export function getAppliances(_recipes) {
    const appliances = _recipes.map(
        (recipe) => recipe.appliance.toLowerCase().trim()
    );
    return new Set(appliances.sort(Intl.Collator().compare) );
}

// Extract unique ustensils from the recipes and sort with accents
export function getUstensils(_recipes) {
    const ustensils = _recipes.map(
        (recipe) => {
            return recipe.ustensils.map(
                (ustensil) => ustensil.toLowerCase().trim())
        });
    return new Set(ustensils.flat().sort(Intl.Collator().compare) );
}

// Extract unique ingredients from the recipes sort with accents
export function getIngredients(_recipes) {
    const ingredients = _recipes.map(
        (recipe) => {
            return recipe.ingredients.map(
                (ingredient) => ingredient.ingredient.toLowerCase().trim())
        });
    return new Set( ingredients.flat().sort(Intl.Collator().compare) );
}