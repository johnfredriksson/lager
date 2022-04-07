import config from "../config/config.json";
import { OrderItem } from "../interfaces/order_item.ts"
import { Order } from "../interfaces/order.ts"

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(item: Partial<OrderItem>) {
            const response = await fetch(`${config.base_url}/products`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item.product_id,
                    name: item.name,
                    api_key: config.api_key,
                    stock: item.stock - item.amount
                })
            })
    },
    updateOrderStatus: async function updateOrderStatus(order: Partial<Order>, status: number) {
        await fetch(`${config.base_url}/orders`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: order.id,
                name: order.name,
                api_key: config.api_key,
                status_id: status
            })
        })
    }
};

export default orders;