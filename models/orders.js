
import { apiKey, baseUrl } from "../utils.js";

const orders = {

    getOrders: async function getOrders() {
        // Skicka HTTP-förfrågan om att hämta ordrarna från apiet med url och nyckel.
        const response = await fetch(`${baseUrl}/orders?api_key=${apiKey}`);
        const result = await(response.json());

        return result.data;
    },

    updateOrder: async function updateOrders(orderObject) {
        const updateOrder = {
            ...orderObject,
            api_key: apiKey
        };

        const respons = await fetch(`${baseUrl}/orders`, {
            body: JSON.stringify(updateOrder),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        console.log(respons);
    }
};

export default orders;
