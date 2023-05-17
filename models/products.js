// Ett JSON-objekt som innehåller funktioner för att jobba mot API:et

import { apiKey, baseUrl } from "../utils.js";

const products = {
    // Skapa en funktion för varje typ av request som görs mot products i lagret

    getProducts: async function getProducts() {
        // Skicka HTTP-förfrågan om att hämta produkter från apiet med url och nyckel
        const response = await fetch(`${baseUrl}/products?api_key=${apiKey}`);
        /* Response innehåller nu en sträng i JSON-format.
         * Konvertera JSON-strängen till ett objekt:
         * Kör await för sekventiell körning / väntar på att det promise
         * som kommer från response.json() har resolvats. Sedan körs
         * resterande kod under.
         */
        const result = await(response.json()); // Hämtar den faktiska datan

        return result.data;
    },

    updateProduct: async function updateProduct(productObject) {
        const updateProduct = {
            ...productObject,
            api_key: apiKey
        };

        const responsen = await fetch (`${baseUrl}/products`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateProduct)
        });

        return responsen;
    }
};

export default products;
