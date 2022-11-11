class Card {

    /*
    const ingredients = getIngredients(ing);

    const html = 
    `<div class="card">
        // name
        ${ingredients}
       // description
    </div>`;

    return html;
    */

    createIngredients(ingredients) {
        const html = ` `;

        return html;
    }


    static create(recipe) {
        const $wrapper = document.createElement("div");
        $wrapper.classList.add("card");

        // Image
        const $img = document.createElement("img");
        $img.classList.add("card-img-top");
        $img.setAttribute("src", "./images/default.png");
        $img.setAttribute("alt", "Image de la recette");
        $wrapper.appendChild($img);

        // Card Body
        const $divBody = document.createElement("div");
        $divBody.classList.add("card-body");

        // Title
        const $divHeader = document.createElement("div");
        $divHeader.classList.add("row");
        const titleHtml = `
            <h4 class="col-8 card-title">${recipe.name}</h4>
            <p class="col-4 fs-5 fw-bold text-end"><i class="bi bi-clock"></i> ${recipe.time} min</p>            
        `;
        $divHeader.innerHTML = titleHtml;
        $divBody.appendChild($divHeader);

        // Ingredients
        const $divIng = document.createElement("div");
        $divIng.classList.add("row");
        $divBody.appendChild($divIng);

        const $ulIng = document.createElement("ul");
        $ulIng.classList.add("col", "list-unstyled");
        $divIng.appendChild($ulIng);

        for (let ingredient of recipe.ingredients) {

            const html = ` `

            const eltIng = document.createElement("li");
            const eltSpan = document.createElement("span");
            eltSpan.classList.add("fw-bold");
            eltSpan.textContent = ingredient.ingredient;

            const eltSpan2 = document.createElement("span");
            let text = "";
            if (ingredient.quantity)  {
                text = ": " + ingredient.quantity ;
                if (ingredient.unit) {
                    text = ": " + ingredient.quantity + " " + ingredient.unit;
                }
            }
            eltSpan2.textContent = text ;
            eltIng.appendChild(eltSpan);
            eltIng.appendChild(eltSpan2);
            $ulIng.appendChild(eltIng);
        }

        // Description
        const $descIng = document.createElement("p");
        $descIng.classList.add("col", "card-description");
        $descIng.textContent = recipe.description;
        $divIng.appendChild($descIng);

        $wrapper.appendChild($divBody);

        return $wrapper;
    }

}

export default Card;