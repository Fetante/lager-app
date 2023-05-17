// component imports
import LagerTitle from "./components/lager-title.js";
import ProductList from "./components/product-list.js";
import SingleProduct from "./components/single-product.js";

import Router from "./router.js";
import Navigation from "./navigation.js";
import ProductsView from "./views/products.js";
import PacklistView from "./views/packlist.js";
import OrderList from "./components/order-list.js";
import SingleOrder from "./components/single-order.js";

import DeliveriesView from "./views/deliveries.js";
import DeliveriesList from "./components/deliveries-list.js";
import NewDelivery from "./components/new-delivery.js";
import SingleDelivery from "./components/single-delivery.js";

import LoginForm from "./components/login-form.js";
import LoginView from "./views/login.js";

import InvoicesView from "./views/invoices.js";
import InvoicesTable from "./components/invoices-table.js";
import NewInvoice from "./components/new-invoice.js";
import SingleInvoice from "./components/single-invoice.js";


customElements.define('lager-title', LagerTitle);
customElements.define('product-list', ProductList);
customElements.define('single-product', SingleProduct);

customElements.define('router-outlet', Router);
customElements.define('products-view', ProductsView);
customElements.define('navigation-outlet', Navigation);
customElements.define('packlist-view', PacklistView);
customElements.define('order-list', OrderList);
customElements.define('single-order', SingleOrder);

customElements.define('deliveries-view', DeliveriesView);
customElements.define('deliveries-list', DeliveriesList);
customElements.define('new-delivery', NewDelivery);
customElements.define('single-delivery', SingleDelivery);


customElements.define('login-view', LoginView);
customElements.define('login-form', LoginForm);

customElements.define('invoices-view', InvoicesView);
customElements.define('invoices-table', InvoicesTable);
customElements.define('new-invoice', NewInvoice);
customElements.define('single-invoice', SingleInvoice);
