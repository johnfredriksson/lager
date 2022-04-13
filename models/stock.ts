import config from "../config/config.json";

const stock = {
    getStock: async function getStock() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        const result = await response.json();

        return result.data;
    },
    updateStock: async function updateStock(product) {
        // console.log(product)
        await fetch(`${config.base_url}/products`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: product.id,
                name: product.name,
                stock: product.stock,
                api_key: config.api_key
            })
        })
    }
}

export default stock
