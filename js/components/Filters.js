import { Algo } from "../helpers/Algo.js";

export class Filters {

    constructor(data) {
        this.$wrapper = document.querySelector('[data-wrapper="filters"]');

        this.filters = [
            new Filter('Ingrédients', 'ingredients', data),
            new Filter('Ustensiles', 'ustensils', data),
            new Filter('Appareils', 'appliances', data)
        ]
    }

    render(){
        this.filters.forEach( (filter) => {
            const elt = filter.render();
            this.$wrapper.appendChild(elt);
            filter.setEvent();
        });
    }

    update(data) {
        this.filters.forEach( (filter) => {
            filter.update(data[filter.category])
        });
    }

    get$() {
        return this.filters.map( (filter) => filter.get$());
    }

    getFilter(category) {
        return this.filters.filter( (filter) => filter.category === category )[0];
    }
}

class Filter {
    constructor(title, category, data) {
        this.title = title;
        this.category = category;
        this.items = data[category];
        this.currentItems = this.items;
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add(`filter-${this.category}`, 'text-white', 'filter', 'rounded','p-3' );
    }

    get$() {
        return this.$;
    }

    render() {
        this.$wrapper.innerHTML = "";

        let items = "";
        this.currentItems.forEach( (item) => {
            items += `<li><button data-tag-add="${item}" class='btn bg-transparent text-white text-start'>${item}</button></li>`;
        });
         
        const html = `
            <div class="d-flex">
                <input 
                    data-input="${this.category}" 
                    type="text"
                    class="form-control border-0 text-white bg-transparent opacity-100"
                    placeholder="${this.title}"
                    aria-label="Recherchez des ${this.title}">
                <button 
                    data-open="${this.category}" 
                    class="btn text-white" 
                    aria-expanded="false">
                    <i class="bi bi-chevron-down ms-3"></i>
                </button>
            </div>
            <div 
                data-body="${this.category}" 
                class="filters__body d-none">
                <ul 
                    class="filters__list list-unstyled">
                    ${items}
                </ul>
            </div>
            `;
        this.$wrapper.innerHTML = html;
        return this.$wrapper;
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

    /*
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

}