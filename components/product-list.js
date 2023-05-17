import productsModel from "../models/products.js";

export default class ProductList extends HTMLElement {
    constructor() {
        super();

        this.products = [];
    }

    async connectedCallback() {
        this.products = await productsModel.getProducts();
        this.render();
    }

    render() {
        // Producera en lista. (join)gör om till sträng
        const list = this.products.map((product) => `<single-product product=
        '${JSON.stringify(product)}'></single-product>`).join("");

        this.innerHTML = `<h2>Produktlista</h2>${list}`;
        console.log(list);
    }
}
