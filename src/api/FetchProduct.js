import axios from "axios";

const fetchProducts = async () => {
    const result = await axios.get('https://dummyjson.com/products');
    return result.data.products;
}

const addProduct = async (product) => {
    const result = await axios.post('https://dummyjson.com/products/add', product);
    return result.data;
}

export { fetchProducts, addProduct };