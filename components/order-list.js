import ordersModel from "../models/orders.js";

export default class OrderList extends HTMLElement {
    constructor() {
        super();

        this.orders = [];
    }

    async connectedCallback() {
        this.orders = await ordersModel.getOrders();

        // Filtrera bort alla ordrar som inte har status 100
        // OCh skicka som argument i this.render(filteredOrders)

        this.orders = this.orders.filter(order => order.status_id === 100);

        console.log(this.orders);

        this.render();
    }

    render() {
        // Producera en lista. (join)gör om till sträng
        const list = this.orders.map((order) => `<single-order order=
        '${JSON.stringify(order)}'></single-order>`).join("");

        this.innerHTML = `<h2>Packlista</h2>${list}`;
    }
}
