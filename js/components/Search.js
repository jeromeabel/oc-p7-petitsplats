export class Search {

    constructor() {
        this.$wrapper = document.querySelector('[data-wrapper="search"]');
    }

    render() {
        const html = `
            <div class="input-group">
                <input data-input="search" type="text" class="form-control form-control-lg bg-light border-0 p-3"
                    placeholder="Rechercher une recette" aria-label="Rechercher une recette">
                <span class="input-group-text bg-light border-0 fs-4 p-3">
                    <i class="bi bi-search"></i>
                </span>
            </div>
            <div data-wrapper="error" class="text-danger p-2 d-none">
                <i class="bi bi-exclamation-circle"></i> 
                    Aucune recette ne correspond à votre recherche ...
                    Veuillez essayer "Soupe", "Tarte", ...
            </div>
        `;

        this.$wrapper.insertAdjacentHTML("afterbegin", html);
        this.$error = document.querySelector('[data-wrapper="error"]');
    }
    
    get $() {
        return document.querySelector('[data-input="search"]');
    }

    showError() {
        this.$error.classList.replace("d-none", "d-block");
    }

    hideError() {
        this.$error.classList.replace("d-block", "d-none");
    }

}