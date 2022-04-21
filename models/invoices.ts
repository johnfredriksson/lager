import config from "../config/config.json";
import storage from "./storage";

const invoices = {
    getInvoices: async function getInvoices() {
        const tokenObj = await storage.readToken()
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "x-access-token": tokenObj.token
            },
        });
        const result = await response.json();
        return result.data;
    },
    createInvoice: async function createInvoice(order) {
        const tokenObj = await storage.readToken()
        const response = await fetch(`${config.base_url}/invoices`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-access-token": tokenObj.token
            },
            body: JSON.stringify({
                api_key: config.api_key,
                order_id: order.id,
                total_price: order.sum,
                due_date: order.due_date
            })
        });
        const result = await response.json();
    }
}

export default invoices;

