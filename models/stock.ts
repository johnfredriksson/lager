import config from "../config/config.json";

const stock = {
    getStock: async function getStock() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        const result = await response.json();

        return result.data;
    }
}

export default stock
