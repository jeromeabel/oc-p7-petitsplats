export class Filters {

    constructor() {
        this.$wrapper = document.querySelector('[data-wrapper="filters"]');

        this.filters = [
            new Filter('Ingrédients', 'ingredients'),
            new Filter('Ustensiles', 'ustensils'),
            new Filter('Appareils', 'appliances')
        ]
    }

    render(data){
        this.filters.forEach( (filter) => {
            const elt = filter.render(data[filter.category]);
            this.$wrapper.appendChild(elt);
            filter.setEvent();
        });
    }

}

class Filter {
    constructor(title, category) {
        this.title = title;
        this.category = category;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add(`filter-${this.category}`, 'text-white', 'filter', 'rounded','p-3' );
    }


    render(_items) {

        this.$wrapper.innerHTML = "";

        let items = "";
        _items.forEach( (item) => {
            items += `<li><button class='btn bg-transparent text-white text-start'>${item}</button></li>`;
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
            <div data-body="${this.category}" class="filters__body d-none">
                <ul class="filters__list list-unstyled">
                    ${items}
                </ul>
            </div>
            `;
        this.$wrapper.innerHTML = html;
        return this.$wrapper;
    }

    setEvent() {
        this.$body = document.querySelector(`[data-body="${this.category}"]`);
        this.$btn = document.querySelector(`[data-open="${this.category}"]`);
        this.$ = document.querySelector(`[data-input="${this.category}"]`);
        this.$btn.addEventListener("click", this.toggle.bind(this));
        this.$.addEventListener("click", this.toggle.bind(this));
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

}