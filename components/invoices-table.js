import invoiceModel from "../models/invoices.js";

export default class InvoicesTable extends HTMLElement {
    constructor() {
        super();
        this.invoices = [];
    }

    async connectedCallback() {
        this.invoices = await invoiceModel.getInvoices();
        this.render();
    }


    /** Skapa en tabell med valfri info om bef. fakturor.
     *  namn pris orderid
     *
     */
    render() {
        if (this.invoices === []) {
            this.innerHTML = `<h2>Inga Fakturor</h2>
            <a href='#invoices-form' class="button blue-button">Ny faktura</a>`;
        } else {
            let tableHead = `<table class='table table-striped table-scroll'>
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th>Summa</th>                            
                            <th>Adress</th>
                            <th>Postnr</th>
                            <th>Ort</th>
                            <th>Land</th>
                        </tr>
                    </thead>
                    <tbody>`;

            let tableBody = this.invoices.map((invoice) => {
                return `<tr>
                    <td data-title='Namn'>${invoice.name.replace(/[^\w\s]/gi, '')}</td>
                    <td data-title='Summa'>${invoice.total_price}</td>                    
                    <td data-title='Adress'>${invoice.address}</td>
                    <td data-title='Postnr'>${invoice.zip}</td>
                    <td data-title='Ort'>${invoice.city}</td>
                    <td data-title='Land'>${invoice.country}</td>
                </tr>`;
            }).join("");

            let tableFooter = `</tbody></table>`;

            this.innerHTML = `<h2>Fakturor</h2>
            ${tableHead}${tableBody}${tableFooter}
            <a href='#invoices-form' class="button blue-button">Ny faktura</a>`;
        }
    }
}
