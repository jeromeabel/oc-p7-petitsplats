export class Algo {

    static findRecipes(recipes, searchTerm) {
        let foundRecipes = [];
    
        for (let recipe of recipes) {
            const name = recipe.name.toLowerCase().trim();
            const description = recipe.description.toLowerCase().trim();
    
            if (name.includes(searchTerm)) { // Name
                foundRecipes.push(recipe);
            } else if (description.includes(searchTerm)) { // Description
                foundRecipes.push(recipe);
            } else {
                for (let ingredient of recipe.ingredients) { // Ingrédients
                    const ingredientName = ingredient.ingredient.toLowerCase().trim();
                    if (ingredientName.includes(searchTerm)) {
                        foundRecipes.push(recipe);
                    }
                }
            }
        }
        return foundRecipes;
    }


    static findRecipesWithTags(recipes, tags) {
        let foundRecipes = tags.map ( (tag) => this.findRecipes(recipes, tag) );
        return new Set(foundRecipes.flat().sort());
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