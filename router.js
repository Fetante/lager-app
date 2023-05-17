export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "Lagerlista",
            },
            "packlist": {
                view: "<packlist-view></packlist-view>",
                name: "Plocklista",
            },
            "deliveries": {
                view: "<deliveries-view></deliveries-view>",
                name: "Inleveranser"
            },
            "deliveries-form": {
                view: "<new-delivery></new-delivery>",
                name: "Ny inleverans",
                hidden: true,
            },
            "login": {
                view: "<login-view></login-view>",
                name: "Logga in",
                hidden: true,
            },
            "invoices": {
                view: "<invoices-view></invoices-view>",
                name: "Fakturor",
            },
            "invoices-form": {
                view: "<new-invoice></new-invoice>",
                name: "Ny faktura",
                hidden: true,
            },
        };
    }

    // Getter för routes.
    get routes() {
        return this.allRoutes;
    }

    // Anropas automatiskt av webbläsaren när en komponent läggs till i DOM-trädet
    // Vill Lyssna om hash ändras: => anropa då resolveRoute
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute(); // Anropa även första gången sidan laddas
    }

    // Anropas när man byter hash (plocklsita/lagerlista)
    resolveRoute() {
        // Tar bort #(om den finns) i hashen: example.com/#about => example.com/about
        this.currentRoute = location.hash.replace("#", "");

        this.render();
    }

    // Anropas av resolveRoute (dvs när man klickar på plocklista eller lager)
    render() {
        this.innerHTML = this.routes[this.currentRoute].view || "<not-found></not-found>";
    }
}
