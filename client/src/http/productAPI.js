import {$host} from "./index";

export const fetchProducts = async () => {
    const {data} = await $host.get("api/product");
    return data;
}

export const fetchProduct = async (id) => {
    const {data} = await $host.get(`api/product/${id}`);
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $host.post('api/product', product);
    return data;
}

export const editProduct = async (product) => {
    const {data} = await $host.put(`api/product/${product.id}`, product);
    return data;
}

export const deleteProduct = async (id) => {
    const {data} = await $host.delete(`api/product/${id}`);
    return data;
}