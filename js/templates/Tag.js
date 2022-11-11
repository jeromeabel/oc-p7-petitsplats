class Tag {

    static create(name, items) {
        const $wrapper = document.createElement("div");
        $wrapper.classList.add("dropdown");

        // Button
        const html = `
            <button class="btn btn-primary p-3 rounded" type="button" data-bs-toggle="dropdown"
                aria-expanded="false" id="filter1">
                ${name}
                <i class="bi bi-chevron-down ms-3"></i>
            </button>`;
        $wrapper.innerHTML = html;

        // List
        const $ulIng = document.createElement("ul");
        $ulIng.classList.add("dropdown-menu", "bg-primary");
        // aria-labelledby="filter1"

        for (let item of items) {
            const liElt = document.createElement("li");
            const aElt = document.createElement("a");
            aElt.classList.add("dropdown-item");
            aElt.textContent = item;
            liElt.appendChild(aElt);
            $ulIng.appendChild(liElt);
        }

        $wrapper.appendChild($ulIng);

        return $wrapper;
    }

}

export default Tag;