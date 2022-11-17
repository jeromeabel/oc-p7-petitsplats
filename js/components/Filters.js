import { getRecipesByType } from "../helpers/Data.js";

export class Filters {

    constructor() {
        // DOM
        this.$wrapper = document.querySelector('[data-app-wrapper="filters"]');

        // Filters objects : label and type
        this.filters = [
            new Filter('Ingrédients', 'ingredients'),
            new Filter('Ustensiles', 'ustensils'),
            new Filter('Appareils', 'appliances')
        ]

        // Add filters to the DOM
        this.initDOM();
    }

    initDOM() {
        this.filters.forEach((filter) => {
            this.$wrapper.appendChild(filter.initDOM());
            filter.initEvents();
        });
    }

    // Add all filters to the container
    render(_recipes) {
        this.filters.forEach((filter) => {
            // Items depends on the filter type
            const items = getRecipesByType(_recipes, filter.type);
            const filterElt = filter.render(items);
            //filter.setEvents();
        });
    }
}

class Filter {
    constructor(label, type) {
        // Data
        this.label = label;
        this.type = type;

        // DOM
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('filter', this.type, 'text-white', 'rounded', 'p-3');
    }

    initDOMVariables() {
        this.$title = this.$wrapper.querySelector('h2');
        this.$body = this.$wrapper.querySelector(`div[data-app-wrapper="filter-body"]`);
        this.$ul = this.$body.querySelector('ul');
        this.$btn = this.$wrapper.querySelector('button[data-app-event="filter-toggle"]');
        this.$icon = this.$btn.querySelector('i');
        this.$input = this.$wrapper.querySelector('input[data-app-event="filter-input"]');
    }

    initEvents() {
        this.initDOMVariables();
        
        this.$btn.addEventListener('click', this.toggleVisibility.bind(this));
    }

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
        return this.$wrapper;
    }

    render(_items) {
        let html = "";
        _items.forEach((item) => {
            html +=
                `<li>
                    <button 
                        data-app-event="add-tag"
                        class="btn bg-transparent text-white">
                        ${item}
                    </button>
                </li>`;
        });
        this.$ul.innerHTML = html;
    }

    setEvents() {

    }

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


}


/*

`filter-${this.type}`
    // Remove accents and uppercase
getNormalizeString(_str) {
    return _str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}



constructor(title, type, data) {
    this.title = title;
    this.type = type;
       }

get$() {
    return this.$;
}


update(items) {
    this.items = items
    this.renderList(items)
}

renderList(items) {
    //console.log(items);
    this.currentItems = items;
    this.$ul.innerHTML = "";
    let htmlItems = "";
    this.currentItems.forEach( (item) => {
        htmlItems += `<li><button data-tag-add="${item}" class='btn bg-transparent text-white text-start'>${item}</button></li>`;
    });
    this.$ul.innerHTML = htmlItems;
}

setEvent() {
    this.$body = document.querySelector(`[data-body="${this.category}"]`);
    this.$ul = this.$body.querySelector("ul");
    this.$btn = document.querySelector(`[data-open="${this.category}"]`);
    this.$ = document.querySelector(`[data-input="${this.category}"]`);

    this.$btn.addEventListener("click", this.toggle.bind(this));
    this.$.addEventListener("click", this.toggle.bind(this));
    //this.$.addEventListener("input", this.search.bind(this));
} 

toggle() {
    if (this.$body.classList.contains("d-block")) {
        this.$.setAttribute('placeholder', `${this.title}`);
        this.$.classList.replace('opacity-50', 'opacity-100');
        this.$body.classList.replace("d-block", "d-none");
    } else if (this.$body.classList.contains("d-none")) {
        this.$body.classList.replace("d-none", "d-block");
        this.$.classList.replace('opacity-100', 'opacity-50');
        this.$.setAttribute('placeholder', `Recherchez des ${this.title}`);
    }
}


search(e) {
    const regexSearch = /^[A-ÿ]{1,}$/; // At least 1 characters
    const searchTerms = e.target.value.toLowerCase().trim();

    let results = [];
    if (searchTerms.length === 0) {
        results = this.items;
    } else if (regexSearch.test(searchTerms)) {
        results = Algo.findItems(this.items, searchTerms);
    }
    this.renderList(results);
}

*/
