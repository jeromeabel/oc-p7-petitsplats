import { getRecipesByType, capitalize } from "../helpers/Data.js";
import { Algo } from "../helpers/Algo.js";

// -------- FILTERS --------- //
export class Filters {

    constructor() {
        // Data
        this.filters = [
            new Filter('Ingrédients', 'ingredients'), // Label, type
            new Filter('Ustensiles', 'ustensils'),
            new Filter('Appareils', 'appliances')
        ]
    }

    // Render all filters
    render(_recipes) {
        this.filters.forEach((filter) => {
            // Items depends on the filter type
            const items = getRecipesByType(_recipes, filter.type);
            filter.render(items);
        });
    }
}

// -------- FILTER --------- //
class Filter extends EventTarget {
    constructor(label, type) {

        super(); // event target

        // Data
        this.label = label;
        this.type = type;
        this.items = [];

        // DOM
        this.$parentWrapper = document.querySelector('[data-app-wrapper="filters"]');
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('filter', this.type, 'text-white', 'rounded', 'p-3');
        this.$parentWrapper.appendChild(this.$wrapper);

        this.initDOM();

        // Variables
        this.$title = this.$wrapper.querySelector('h2');
        this.$body = this.$wrapper.querySelector(`div[data-app-wrapper="filter-body"]`);
        this.$ul = this.$body.querySelector('ul');
        this.$btn = this.$wrapper.querySelector('button[data-app-event="filter-toggle"]');
        this.$icon = this.$btn.querySelector('i');
        this.$input = this.$wrapper.querySelector('input[data-app-event="filter-input"]');

        this.initEvents();
    }


    // ---- DOM ---- //
    initDOM() {
        this.$wrapper.innerHTML = "";

        const labelLowerCase = this.label.toLowerCase();

        const html = `
            <div class="d-flex align-items-center">
                <h2 class="d-block fs-5" >${this.label}</h2>
                <input 
                    data-app-event="filter-input"
                    type="text"
                    class="d-none form-control border-0 text-white bg-transparent"
                    placeholder="Recherchez des ${labelLowerCase}"
                    aria-label="Recherchez des ${labelLowerCase}">
                <button 
                    data-app-event="filter-toggle"
                    type="button"
                    class="btn text-end text-white ms-5" 
                    aria-expanded="false">
                    <i class="fa-sharp fa-solid fa-chevron-down"></i>
                </button>
            </div>
            <div 
                data-app-wrapper="filter-body" 
                class="d-none filter__body">
                <ul 
                    class="list-unstyled grid filter__list">
                </ul>
            </div>
            `;
        this.$wrapper.innerHTML = html;
    }

    render(_items) {
        this.items = _items; // Update data for search
        this.renderItems(_items); // Render DOM list of items
    }

    renderItems(_items) {
        // Create list
        let html = "";
        _items.forEach((item) => {
            const itemLabel = capitalize(item);
            html +=
                `<li>
                    <button 
                        data-app-type="${this.type}"
                        data-app-tag="${item}"
                        data-app-event="add-tag"
                        class="btn bg-transparent text-white text-start">
                        ${itemLabel}
                    </button>
                </li>`;
        });
        this.$ul.innerHTML = html;
    }

    // ---- EVENTS ---- //

    initEvents() {
        this.$btn.addEventListener('click', this.toggleVisibility.bind(this));
        this.$input.addEventListener('input', this.searchItems.bind(this));
    }


    // ----- EVENTS CALLBACKS ----- //

    // Hide / show the list of items
    toggleVisibility() {
        if (this.$body.classList.contains("d-none")) {
            this.$title.classList.replace("d-block", "d-none");
            this.$body.classList.replace("d-none", "d-block");
            this.$input.classList.replace("d-none", "d-block");
            this.$icon.classList.replace("fa-chevron-down", "fa-chevron-up");
        } else if (this.$body.classList.contains("d-block")) {
            this.$title.classList.replace("d-none", "d-block");
            this.$body.classList.replace("d-block", "d-none");
            this.$input.classList.replace("d-block", "d-none");
            this.$icon.classList.replace("fa-chevron-up", "fa-chevron-down");
        }
    }

    searchItems(e) {
        const regexSearch = /^[A-ÿ]{1,}$/; // At least 1 characters
        const searchTerms = e.target.value.toLowerCase().trim();
        let results = [];
        if (searchTerms.length === 0) {
            results = this.items;
        } else if (regexSearch.test(searchTerms)) {
            results = Algo.findItems(this.items, searchTerms);
        }
        this.renderItems(results);
    }
}
