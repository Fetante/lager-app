
export default class SingleInvoice extends HTMLElement {
    // Lägger till att det ska finnas ett attribut som heter product
    // Då värdet ändras kommer "attributeChangedCallback" anropas med info om ändringen
    static get observedAttributes() {
        return ["invoice"];
    }

    /* Getter för product.
     * Använder getAttribute för att hämta värdet på attributet "product" från det aktuella
     * elementet.
     * Värdet är en JSON-sträng, (från render() i product list), därför används JSON.parse för att
     * omvandla strängen till ett JS-objekt som returneras.
     */
    get invoice() {
        return JSON.parse(this.getAttribute("invoice"));
    }


    // connectedCallback() {
    //     this.innerHTML = `
    //       <div class="invoice">
    //         <h3 class="name">${this.invoice.name} ${this.invoice.total_price}kr</h3>
    //       </div>`;
    // }
}
