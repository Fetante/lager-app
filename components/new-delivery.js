import productsModel from "../models/products.js";
import deliveriesModel from "../models/deliveries.js";


export default class NewDelivery extends HTMLElement {
    constructor() {
        super();

        this.delivery = {};
        this.products = [];
    }

    // 1.Uppdatera lagerapiet med ett nytt delivery
    // 2. Uppdatera antalet produkter som finns efter delivery (Anropa updateproducts):
    /**
     * const result = await productsModel.updateProduct(updatedProduct);
     */
    async createDelivery() {
        const response = await deliveriesModel.createDelivery(this.delivery);

        if (response === 201) {
            location.hash = "deliveries";
        }

        // Uppdatera produkten
        let updatedProduct = {
            id: this.delivery.product_id,
            name: this.delivery.name,
            stock: this.delivery.current_stock + this.delivery.amount
        };
        const result = await productsModel.updateProduct(updatedProduct);

        console.log(result);
    }

    async connectedCallback() {
        this.products = await productsModel.getProducts();
        this.render();
    }

    // Bygg upp formuläret
    render() {
        let form = document.createElement("form");

        form.classList.add("form-inleverans");

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Skicka inte till servern, gå ned

            if (this.delivery.product_id > 0) {
                console.log(this.delivery);
                this.createDelivery();
            }
        });

        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa inleverans");
        submitButton.classList.add("button", "green-button");

        // Göra selectdropdown
        let selectLabel = document.createElement("label");

        selectLabel.classList.add("input-label");
        selectLabel.textContent = "Produkt";

        let select = document.createElement("select");

        select.setAttribute("required", "required");
        select.setAttribute("title", "Välj produkt");

        select.classList.add("input");

        let option = document.createElement("option");

        option.setAttribute("value", -99);
        option.textContent = "Välj en produkt";
        select.appendChild(option);


        this.products.forEach((item) => {
            let option = document.createElement("option");

            option.setAttribute("value", item.id);
            option.dataset.stock = item.stock;  // nyckel = stock
            option.textContent = item.name;

            select.appendChild(option);
        });

        // Eventlysssnare på select
        select.addEventListener("change", (event) => {
            this.delivery = {
                ...this.delivery, // Kopiera in objektet
                product_id: parseInt(event.target.value), // Skriv över med nya värden
                current_stock: parseInt(event.target.selectedOptions[0].dataset.stock),
            };
        });

        // Skapa input för amount
        let amountLabel = document.createElement("label");

        amountLabel.classList.add("input-label");
        amountLabel.textContent = "Antal";

        let amountInput = document.createElement("input");

        amountInput.setAttribute("type", "number");
        amountInput.setAttribute("required", "required");
        amountInput.setAttribute("placeholder", "Ange antal");
        amountInput.classList.add("input");

        amountInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                amount: parseInt(event.target.value)
            };
        });

        // Skapa Date input:
        let dateLabel = document.createElement("label");

        dateLabel.classList.add("input-label");
        dateLabel.textContent = "Datum";

        let dateInput = document.createElement("input");

        dateInput.setAttribute("type", "date");
        dateInput.setAttribute("reqiured", "required");
        dateInput.classList.add("input");

        dateInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                delivery_date: (event.target.value)
            };
        });

        let commentLabel = document.createElement("label");

        commentLabel.classList.add("input-label");
        commentLabel.textContent = "Kommentar";

        let comment = document.createElement("textarea");

        comment.setAttribute("placeholder", "Lämna kommentar.. (valfritt)");
        comment.classList.add("input");
        comment.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                comment: event.target.value
            };
        });

        // Lägg till i formuläret
        form.appendChild(selectLabel);
        form.appendChild(select);

        form.appendChild(amountLabel);
        form.appendChild(amountInput);

        form.appendChild(dateLabel);
        form.appendChild(dateInput);

        form.appendChild(commentLabel);
        form.appendChild(comment);

        form.appendChild(submitButton);

        this.appendChild(form);
    }
}
