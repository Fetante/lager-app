// En klass som är en komponent
// Exportera klassen LagerTitle som extendar HTMLElement.
export default class LagerTitle extends HTMLElement {
    constructor() {
        super();

        this.name = "Andreas";
    }

    static get observedAttributes() {
        // Returnera en lista med attribut som kan modifieras
        return ["name"];
    }

    // Dynamiskt ändra name på lager-title i index.html
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;
    }

    connectedCallback() {
        this.innerHTML = `<h1>${this.name}'s Lager-app</h1>`;
    }
}
