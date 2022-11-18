// Helpers functions

export function setUniqueValues(_arr) {
    return new Set(_arr.flat().sort());
}

// Remove accents and uppercase
export function getNormalizedString(_str) {
    return _str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function capitalize(_str) {
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

export function getAppliances(_recipes) {
    const appliances = _recipes.map(
        (recipe) => recipe.appliance.toLowerCase().trim()
    );
    return new Set(appliances.sort());
}

export function getUstensils(_recipes) {
    const ustensils = _recipes.map(
        (recipe) => {
            return recipe.ustensils.map(
                (ustensil) => ustensil.toLowerCase().trim())
        });
    return new Set(ustensils.flat().sort());
}

export function getIngredients(_recipes) {
    const ingredients = _recipes.map(
        (recipe) => {
            return recipe.ingredients.map(
                (ingredient) => ingredient.ingredient.toLowerCase().trim())
        });
    return new Set(ingredients.flat().sort());
}