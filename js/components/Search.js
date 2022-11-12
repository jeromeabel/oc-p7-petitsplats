export class Search {

    constructor() {
        this.$wrapper = document.getElementById("search");
        this.$error = document.createElement("div");
    }
    
    render() {
        const html = `
            <div class="input-group">
                <input type="text" class="form-control form-control-lg bg-light border-0 p-3"
                    placeholder="Rechercher une recette" aria-label="Rechercher une recette">
                <span class="input-group-text bg-light border-0 fs-4 p-3">
                    <i class="bi bi-search"></i>
                </span>
            </div>
        `;

        this.$wrapper.insertAdjacentHTML("afterbegin", html);
    }

    displayError() {
        // <div id="message" class="text-danger p-2 d-none"></div>
    }

    clearError() {
    }
}