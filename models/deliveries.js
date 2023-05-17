// Ett JSON-objekt som innehåller funktioner för att jobba mot API:et

import { apiKey, baseUrl } from "../utils.js";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${baseUrl}/deliveries?api_key=${apiKey}`);
        const result = await(response.json()); // Hämtar den faktiska datan

        return result.data;
    },

    createDelivery: async function createDelivery(deliveryObject) {
        const updateDelivery = {
            ...deliveryObject,
            api_key: apiKey
        };

        const result = await fetch(`${baseUrl}/deliveries`, {
            body: JSON.stringify(updateDelivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        return result;
    }
};

export default deliveries;
