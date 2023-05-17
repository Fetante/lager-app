
import invoiceModel from "../models/invoices.js";
import orderModel from "../models/orders.js";

export default class NewInvoice extends HTMLElement {
    constructor() {
        super();

        this.invoice = {};
        this.orders = [];
    }

    // 1.Uppdatera lagerapiet med ett nytt delivery
    // 2. Uppdatera antalet produkter som finns efter delivery (Anropa updateproducts):
    /**
     * const result = await productsModel.updateProduct(updatedProduct);
     */

    async createInvoice() {
        const response = await invoiceModel.createInvoice(this.invoice);

        if (response === 201) {
            location.hash = "invoices";
        }

        //Uppdatera ordern när ny faktura skapats. Vid fakturering ska status_id vara 600??
        let updatedOrder = {
            id: this.invoice.order_id,
            name: this.invoice.name,
            status_id: 600,
        };
        const result = await orderModel.updateOrder(updatedOrder);

        console.log(result);
    }

    async connectedCallback() {
        this.orders = await orderModel.getOrders();
        this.render();
    }

    // Bygg upp formuläret
    render() {
        let form = document.createElement("form");

        form.classList.add("form-invoice");

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Skicka inte till servern, gå ned

            if (this.invoice.order_id > 0) {
                this.createInvoice();
            }
        });

        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa faktura");
        submitButton.classList.add("button", "green-button");

        // Göra selectdropdown
        let selectLabel = document.createElement("label");

        selectLabel.classList.add("input-label");
        selectLabel.textContent = "Order";

        let select = document.createElement("select");

        select.setAttribute("required", "required");
        select.setAttribute("title", "Välj order");

        select.classList.add("input");

        let option = document.createElement("option");

        option.setAttribute("value", -99);
        option.textContent = "Välj en order";
        select.appendChild(option);


        // Lägg in varje order i drop-down listan
        this.orders.forEach((item) => {
            // Endast packade varor kan faktureras
            if (item.status_id === 200) {
                let option = document.createElement("option");

                option.setAttribute("value", item.id);
                option.dataset.name = item.name;  // nyckel = stock
                option.dataset.price = item.order_items.reduce((total, orderItem) => {
                    return total + (orderItem.price * orderItem.amount);
                }, 0);

                option.textContent = `${item.name} (${item.id})`;

                select.appendChild(option);
            }
        });

        // Eventlysssnare på select
        // event.target.value är item.id => order-id
        select.addEventListener("change", (event) => {
            this.invoice = {
                ...this.invoice, // Kopiera in objektet
                order_id: parseInt(event.target.value), // Skriv över med nya värden
                //name: event.target.selectedOptions[0].dataset.name,
                total_price: parseInt(event.target.selectedOptions[0].dataset.price),
            };
        });

        // Lägg till i formuläret
        form.appendChild(selectLabel);
        form.appendChild(select);

        form.appendChild(submitButton);

        this.appendChild(form);
    }
}
