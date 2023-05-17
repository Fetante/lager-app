export default class Deliveries extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<header class="header">
                                <lager-title title="Inleveranser"></lager-title>
                             </header>
                             <main class="main">
                                <deliveries-list></deliveries-list>
                             </main>
                             `;
    }
}
