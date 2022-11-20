import { capitalizeFirstChar } from "../helpers/Data.js";

// Handle tags by type : ingredients, ustensils, appliances
export class Tags {

    constructor() {
        // Data : three arrays for each type
        this.tags = {
            "ingredients": [],
            "ustensils": [],
            "appliances": [],
        }

        // DOM
        this.$wrapper = document.querySelector('[data-app-wrapper="tags"]');
        this.$wrapper.innerHTML = `<ul class="d-flex gap-3 list-unstyled"></ul>`;
        this.$ul = this.$wrapper.querySelector('ul');
    }

    // Insert tag into the tags depending on type
    add(_tag, _type) {

        const data = this.tags[_type];

        if (!data.includes(_tag)) {
            // Add tag
            data.push(_tag);

            // Add to DOM
            const tagLabel = capitalizeFirstChar(_tag);
            const $li = document.createElement('li');

            const html = `
                <button 
                    data-app-type=${_type}
                    data-app-tag="${_tag}"
                    data-app-event="remove-tag" 
                    class="badge border-0 fw-normal fs-6 p-3 ${_type}">
                    ${tagLabel}
                    <i class="ms-3 fa-regular fa-circle-xmark"></i>
                </button>
            `;
            $li.insertAdjacentHTML("beforeend", html);
            this.$ul.appendChild($li);
            return $li;
        }
        return undefined;
    }

    remove(_tag, _type) {
        this.tags[_type] = this.tags[_type].filter(t => t !== _tag);
    }

}