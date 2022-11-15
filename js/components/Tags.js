export class Tags {
    constructor() {
        this.$wrapper = document.querySelector('[data-wrapper="tags"]');
        this.tags = [];
    }

    get $() {
        return this.$wrapper;
    }

    get items() { return this.tags};

    add(keywords){

       if (!this.tags.includes(keywords)) {
            const tag = new Tag(keywords);
            this.tags.push(keywords);
            this.$wrapper.insertAdjacentHTML("beforeend", tag.render());
            return true;
       }
    
       return false;

    }

    remove(keywords){
        if (this.tags.includes(keywords)) {
            this.tags = this.tags.filter( ( _keywords ) => _keywords !== keywords);
            //console.log(this.tags)
            return true;
        }

        return false;
     }

}


class Tag {

    constructor(keywords) {
        this.keywords = keywords;
    }

    render() {
        return `<div class="text-white fw-normal badge bg-primary fs-6 p-3">
                    ${this.keywords}
                    <i 
                    data-tag-remove="${this.keywords}" 
                    class="ms-2 bi bi-x-circle">
                    </i>
                </div>`
    }
}