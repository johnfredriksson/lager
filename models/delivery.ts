import config from "../config/config.json";
import Delivery from "../interfaces/delivery";

const deliveryModel = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
            const response = await fetch(`${config.base_url}/deliveries`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: delivery.product_id,
                    amount: delivery.amount,
                    delivery_date: delivery.delivery_date,
                    api_key: config.api_key,
                    comment: delivery.comment
                })
            })
    }
};

export default deliveryModel;