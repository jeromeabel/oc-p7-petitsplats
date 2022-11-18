
import { capitalize } from "../helpers/Data.js";

export class Tags {

    constructor() {
        // Data
        this.tags = [];

        // DOM
        this.$wrapper = document.querySelector('[data-app-wrapper="tags"]');
        this.$wrapper.innerHTML = `<ul class="grid list-unstyled"></ul>`;
        this.$ul = this.$wrapper.querySelector('ul');
    }

    add(_tag, _type) {
        if (!this.tags.includes(_tag)) {
            this.tags.push(_tag);
            const tagLabel = capitalize(_tag);
            const html = `
            <button 
                data-app-type=${_type}
                data-app-tag="${_tag}"
                data-app-event="remove-tag" 
                class="btn fw-normal badge fs-6 p-3 ${_type}">
                ${tagLabel}
                <i class="ms-3 fa-regular fa-circle-xmark"></i>
            </button>`;
            this.$ul.insertAdjacentHTML("beforeend", html);
            return true
        }
        return false;
    }

    remove(_tag, _type) {
        this.tags = this.tags.filter( t => t !== _tag);
    }

}