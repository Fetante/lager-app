import deliveriesModel from "../models/deliveries.js";

export default class DeliveriesList extends HTMLElement {
    constructor() {
        super();
        this.deliveries = [];
    }

    async connectedCallback() {
        this.deliveries = await deliveriesModel.getDeliveries();
        this.render();
    }

    render() {
        // Producera en lista. (join)gör om till sträng
        const list = this.deliveries.map((delivery) => `<single-delivery delivery=
        '${JSON.stringify(delivery)}'></single-delivery>`).join("");

        this.innerHTML = `<h2>Inleveranser</h2>
                    <a href='#deliveries-form' class="button blue-button">Ny inleverans</a>`;
        this.innerHTML += `${list}`;
        console.log("här är list för deliveries list: " + list);
    }
}
