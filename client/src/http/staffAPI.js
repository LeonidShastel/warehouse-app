import {$host} from "./index";

export const fetchStaff = async () =>{
    const {data} = await $host.get('/api/staff/');
    return data;
}

export const fetchEmployee = async (id) =>{
    const {data} = await $host.get(`api/staff/${id}`);
    return data;
}

export const createEmployee = async (employee) => {
    const {data} = await $host.post('api/staff/', employee);
    return data;
}

export const deleteEmployee = async (id) => {
    const {data} = await $host.delete(`api/staff/${id}`);
    return data;
}