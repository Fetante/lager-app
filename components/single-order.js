
import productsModel from "../models/products.js";
import ordersModel from "../models/orders.js";

export default class SingleOrder extends HTMLElement {
    // Lägger till att det ska finnas ett attribut som heter order
    // Då värdet ändras kommer "attributeChangedCallback" anropas med info om ändringen
    static get observedAttributes() {
        return ["order"];
    }

    /* Getter för order.
     * Använder getAttribute för att hämta värdet på attributet "order" från det aktuella
     * elementet.
     * Värdet är en JSON-sträng, (från render() i order list), därför används JSON.parse för att
     * omvandla strängen till ett JS-objekt som returneras.
     */
    get order() {
        return JSON.parse(this.getAttribute("order"));
    }

    async packOrder(order) {
        let statusOk = false;

        // Uppdatera stock antal för varje produkt
        for (const item of order.order_items) {
            var updatedProduct = {
                id: item.product_id,
                name: item.name,
                stock: item.stock - item.amount
            };
            const result = await productsModel.updateProduct(updatedProduct);

            if (result.status < 300) {
                statusOk = true;
            }
        }
        if (statusOk) {
            // Om det gick bra att uppdatera produkter
            // Uppdatera order status
            var updatedOrder = {
                id: order.id,
                name: order.name,
                status_id: 200,
                //api_key: apiKey,
            };
            const respons = await ordersModel.updateOrder(updatedOrder);

            this.remove();
            console.log(respons);
        }
    }


    /**
     * "this.order" anropar "get order", vilket gör om ordern till ett js objekt.
     * attributet "name" finns i datan och kan vara: "Skruv M14"
     * Attributet "price" kan vara 10.. "stock" kan vara 20 osv..  "
     */
    connectedCallback() {
        // SKapa div element
        let container = document.createElement("div");

        container.classList.add("order");

        // Används till att kolla om alla produkter finns i lager.
        let numberOfProducts = 0;
        let isInStock = 0;
        // Loopa igenom alla order_items och skapa en div med info för varje order.
        const orderItems = this.order.order_items.map((item) => {
            numberOfProducts++;
            if (item.amount <= item.stock) {
                isInStock++;
            } else {
                isInStock = -100;
            }

            return `
            <div>
                <p class="order-produkt">
                ${item.name}: 
                ${item.amount}st.
                ${item.location}</p>
            </div>
            `;
        }).join("");

        let button = document.createElement("button");

        button.textContent = "Packa order";
        button.classList.add("button", "green-button");
        button.addEventListener('click', () => {
            this.packOrder(this.order);
        });

        container.innerHTML = `<p class="name">${this.order.name}</p>${orderItems}`;
        // Skapa knapp om alla räknaren för alla produkter
        // är lika med alla räknaren för produkter i stocken
        if (numberOfProducts === isInStock) {
            container.appendChild(button);
        }

        this.appendChild(container);
    }
}
