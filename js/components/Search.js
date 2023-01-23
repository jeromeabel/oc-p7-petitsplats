// Handle main search input DOM
export class Search  {

    constructor() {
        // DOM
        this.$wrapper = document.querySelector('[data-app-wrapper="search"]');

        // Add to the DOM
        this.$wrapper.insertAdjacentHTML("afterbegin", this.initDOM());
        this.$input = this.$wrapper.querySelector('input[data-app-event="search"]')
        this.$error = this.$wrapper.querySelector('div[data-app-wrapper="error"]');
    }

    initDOM() {
        const html = `
            <div class="input-group input-group-lg bg-light rounded">
                <input 
                    data-app-event="search" 
                    type="text" 
                    class="form-control rounded bg-transparent border-0"
                    placeholder="Rechercher une recette" 
                    aria-label="Rechercher une recette">
                <span 
                    class="input-group-text position-absolute end-0 bg-transparent border-0 h-100">
                    <i 
                        class="fa-solid fa-magnifying-glass fs-4" 
                        aria-hidden="true"></i>
                </span>
            </div>
            <div 
                data-app-wrapper="error" 
                class="text-danger p-2 d-none">
                <i class="bi bi-exclamation-circle"></i> 
                    Aucune recette ne correspond à votre recherche... Vous pouvez
                    chercher « tarte aux pommes », « poisson », etc.
            </div>
        `;
        return html;
    }

    showError() {
        this.$error.classList.replace("d-none", "d-block");
    }

    hideError() {
        this.$error.classList.replace("d-block", "d-none");
    }

}