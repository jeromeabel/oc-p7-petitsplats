/*
 * Add recipes cards to the recipes section
 */
export class Recipes {

    constructor() {
        this.$wrapper = document.querySelector('[data-wrapper="recipes"]');
    }

    render(_recipes) {
        this.$wrapper.innerHTML = "";
        const cards = _recipes.map((recipe) => new RecipeCard(recipe));
        cards.forEach(
            (card) => this.$wrapper.appendChild(card.render())
        );
    }
}

class RecipeCard {

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.time = data.time;
        this.description = data.description;
        this.ingredients = data.ingredients;

        // DOM
        this.$wrapper = document.createElement("div");
        this.$wrapper.classList.add("card");
        this.$wrapper.setAttribute("data-id", this.id);
    }

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
            //${ingredient.quantity || ''} ${ingredient.unit || ''}
        }
        return html;
    }

    renderDescription()  {
        let description = this.description;
        if (this.description.length > 200) {
            description = this.description.slice(0, 200) + "...";
        }
        return description;
    }

    render() {
        const ingredients = this.renderIngredients();
        const description = this.renderDescription();
        const html =
            `
            <img class="card-img-top" src="./images/default.png" alt="${this.name}">
            <div class="card-body">
                <div class="d-flex gap-2 justify-content-between">
                    <h4 class="card-title">${this.name}</h4>
                    <p class="fw-bold">
                        <i class="bi bi-clock"></i> ${this.time} min
                    </p>
                </div>
                <div class="d-flex gap-2">
                    <ul class="list-unstyled">
                        ${ingredients}
                    </ul>
                    <p class="card-description">
                        ${description}
                    </p>
                </div>
            </div>
            `;
        this.$wrapper.insertAdjacentHTML("afterbegin", html);
        return this.$wrapper;
    }
}