// -------- RECIPES --------- //
// Handle all recipes with the DOM
export class Recipes {

    constructor() {
        this.$wrapper = document.querySelector('[data-app-wrapper="recipes"]');
    }

    render(_recipes) {
        this.$wrapper.innerHTML = "";
        const cards = _recipes.map((recipe) => new RecipeCard(recipe));
        cards.forEach(
            (card) => this.$wrapper.appendChild(card.render())
        );
    }
}

// -------- RECIPECARD --------- //
// Handle DOM view for one recipe
class RecipeCard {

    constructor(data) {
        // Data
        this.name = data.name;
        this.time = data.time;
        this.description = data.description;
        this.ingredients = data.ingredients;

        // DOM
        this.$wrapper = document.createElement("div");
        this.$wrapper.classList.add("card");
    }

    // Add each ingredient and handle properties 
    renderIngredients() {
        let html = "";
        for (let ingredient of this.ingredients) {
            html += `<li><span class="fw-bold">${ingredient.ingredient}</span>`;
            if (ingredient.quantity) html += `: ${ingredient.quantity}`
            if (ingredient.unit) {
                if (ingredient.unit === "grammes") html += " g";
                else html += ` ${ingredient.unit}`;
            }
            html += `</li>`;
        }
        return html;
    }

    // Trunk the description
    renderDescription() {
        let description = this.description;
        if (this.description.length > 200) {
            description = this.description.slice(0, 200) + "...";
        }
        return description;
    }

    // Main render
    render() {
        const ingredients = this.renderIngredients();
        const description = this.renderDescription();
        const html =
            `
            <img class="card-img-top" src="./images/default.png" alt="${this.name}">
            <div class="card-body">
                <div class="d-flex gap-2 justify-content-between">
                    <h3 class="fs-5">${this.name}</h3>
                    <p class="fw-bold">
                        <i class="fa-regular fa-clock me-1"></i> ${this.time} min
                    </p>
                </div>
                <div class="row card-text">
                    <ul class="col list-unstyled">
                        ${ingredients}
                    </ul>
                    <p class="col">
                        ${description}
                    </p>
                </div>
            </div>
            `;
        this.$wrapper.insertAdjacentHTML("afterbegin", html);
        return this.$wrapper;
    }
}