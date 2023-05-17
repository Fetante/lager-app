// Ett JSON-objekt som innehåller funktioner för att jobba mot API:et

import { apiKey, baseUrl } from "../utils.js";

const auth = {
    token: "",

    login: async function login(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey,
        };
        const response = await fetch(`${baseUrl}/auth/login`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': "application/json"
            },
            method: "POST",
        });
        const result = await(response.json()); // Hämtar den faktiska datan

        if ("errors" in result) { // Finns nyckeln errors i vår data
            return result.errors.detail;
        } else {
            auth.token = result.data.token;
            console.log(auth.token);
            return "ok";
        }
    },

    register: async function register(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey,
        };
        const response = await fetch(`${baseUrl}/auth/register`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': "application/json"
            },
            method: "POST",
        });
        const result = await(response.json()); // Hämtar den faktiska datan

        if (result.data.message === "User successfully registered.") {
            return "ok";
        }
        return "not ok";
    },
};

export default auth;
