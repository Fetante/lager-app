// Ett JSON-objekt som innehåller funktioner för att jobba mot API:et
import authModel from "../models/auth.js";
import { apiKey, baseUrl } from "../utils.js";

const invoices = {
    getInvoices: async function getInvoices() {
        const response = await fetch(`${baseUrl}/invoices?api_key=${apiKey}`, {
            headers: {
                'x-access-token': authModel.token,
            }
        });
        const result = await(response.json()); // Hämtar den faktiska datan

        return result.data;
    },

    createInvoice: async function createInvoice(invoiceObject) {
        const updateInvoice = {
            ...invoiceObject,
            api_key: apiKey
        };

        const result = await fetch(`${baseUrl}/invoices`, {
            body: JSON.stringify(updateInvoice),
            headers: {
                'content-type': 'application/json',
                'x-access-token': authModel.token,
            },
            method: 'POST'
        });

        return result;
    }
};

export default invoices;
