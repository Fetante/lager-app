import Router from "./router.js";

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }

    // connect component
    connectedCallback() {
        const routes = this.router.routes;

        let navigationLinks = "";

        // För varje egenskap i routes skapa länk-tagg
        // och namnet från this.allroutes name:
        for (let path in routes) {
            if (routes[path].hidden) {
                continue;
            }
            navigationLinks += `<a href='#${path}'>${routes[path].name}</a>`;
        }

        this.innerHTML = `<nav>${navigationLinks}</nav>`;
    }
}
