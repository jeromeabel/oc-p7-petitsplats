export class Data {

    static getNames(_recipes) {
        const names = _recipes.map(
            (recipe) => recipe.name.toLowerCase().trim()
        );
        return new Set(names.sort());
    }

    static getAppliances(_recipes) {
        const appliances = _recipes.map(
            (recipe) => recipe.appliance.toLowerCase().trim()
        );
        return new Set(appliances.sort());
    }

    static getUstensils(_recipes) {
        const ustensils = _recipes.map(
            (recipe) => {
                return recipe.ustensils.map(
                    (ustensil) => ustensil.toLowerCase().trim())
            });
        return new Set(ustensils.flat().sort());
    }

    static getIngredients(_recipes) {
        const ingredients = _recipes.map(
            (recipe) => {
                return recipe.ingredients.map(
                    (ingredient) => ingredient.ingredient.toLowerCase().trim())
            });
        return new Set(ingredients.flat().sort());
    }

    static getIngredients2(_recipes) {
        const ingredients = [];
        _recipes.forEach( (recipe) => {
            recipe.ingredients.forEach( (ingredient) => {
                ingredients.push(ingredient.ingredient.toLowerCase().trim());
            })
        });
        return new Set(ingredients.flat().sort());
    }
}