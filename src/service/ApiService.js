import axios from 'axios';

const PRODUCT_API_BASE_URL = 'https://s1nqsxgdtc.execute-api.us-east-1.amazonaws.com/dev/products/';

class ApiService {

    fetchProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    fetchProductById(ProductId) {
        return axios.get(PRODUCT_API_BASE_URL + ProductId);
    }

    deleteProduct(ProductId) {
        return axios.delete(PRODUCT_API_BASE_URL + ProductId);
    }

    addProduct(Product) {
        return axios.post(""+PRODUCT_API_BASE_URL, Product);
    }

    editProduct(Product) {
        return axios.put(PRODUCT_API_BASE_URL + Product.id, Product);
    }

}

export default new ApiService();