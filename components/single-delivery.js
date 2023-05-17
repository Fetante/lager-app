
export default class SingleDelivery extends HTMLElement {
    // Lägger till att det ska finnas ett attribut som heter product
    // Då värdet ändras kommer "attributeChangedCallback" anropas med info om ändringen
    static get observedAttributes() {
        return ["delivery"];
    }

    /* Getter för product.
     * Använder getAttribute för att hämta värdet på attributet "product" från det aktuella
     * elementet.
     * Värdet är en JSON-sträng, (från render() i product list), därför används JSON.parse för att
     * omvandla strängen till ett JS-objekt som returneras.
     */
    get delivery() {
        return JSON.parse(this.getAttribute("delivery"));
    }

    /**
     * "this.product" anropar "get product", vilket gör om produkten till ett js objekt.
     * attributet "name" finns i datan och kan vara: "Skruv M14"
     * Attributet "price" kan vara 10.. "stock" kan vara 20 osv..  "
     */
    connectedCallback() {
        this.innerHTML = `
          <div class="delivery">
              <h3 class="name">${this.delivery.product_name}</h3>
              <p>Antal: ${this.delivery.amount}, Datum: ${this.delivery.delivery_date}</p>
              <span>Kommentar:</span> 
              <span class=comments>"${this.delivery.comment}"</span>            
          </div>`;
    }
}
