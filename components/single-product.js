
export default class SingleProduct extends HTMLElement {
    // Lägger till att det ska finnas ett attribut som heter product
    // Då värdet ändras kommer "attributeChangedCallback" anropas med info om ändringen
    static get observedAttributes() {
        return ["product"];
    }

    /* Getter för product.
     * Använder getAttribute för att hämta värdet på attributet "product" från det aktuella
     * elementet.
     * Värdet är en JSON-sträng, (från render() i product list), därför används JSON.parse för att
     * omvandla strängen till ett JS-objekt som returneras.
     */
    get product() {
        return JSON.parse(this.getAttribute("product"));
    }

    /**
     * "this.product" anropar "get product", vilket gör om produkten till ett js objekt.
     * attributet "name" finns i datan och kan vara: "Skruv M14"
     * Attributet "price" kan vara 10.. "stock" kan vara 20 osv..  "
     */
    connectedCallback() {
        this.innerHTML = `
          <div class="product">
            <div class="product-info">
              <p class="name">${this.product.name}</p>
              <div class="saldo-plats">
                <p class="saldo">Saldo: ${this.product.stock}</p>
                <p class="plats">Plats: ${this.product.location}</p>
              </div>
            </div>
          </div>`;
    }
}
