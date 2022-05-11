import {$host} from "./index";

export const fetchStatuses = async () =>{
    const {data} = await $host.get('/api/statuses/');
    return data;
}

export const fetchStatus = async (id) =>{
    const {data} = await $host.get(`api/statuses/${id}`);
    return data;
}

export const createStatus = async (status) => {
    const {data} = await $host.post('api/statuses/', status);
    return data;
}

export const deleteStatus = async (id) => {
    const {data} = await $host.delete(`api/statuses/${id}`);
    return data;
}