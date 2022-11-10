class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        // {
        //     "ingredient" : "Lait de coco",
        //     "quantity" : 400,
        //     "unit" : "ml"
        // },
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils; //  ["cuillère à Soupe", "verres", "presse citron" ]
    }
}