import {$host} from "./index";

export const fetchShipments = async () => {
    const {data} = await $host.get("api/shipments");
    return data;
}

export const fetchShipment = async (id) => {
    const {data} = await $host.get(`api/shipments/${id}`);
    return data;
}

export const createShipment = async (shipment) => {
    const {data} = await $host.post('api/shipments', shipment);
    return data;
}

export const editShipment = async (shipment) => {
    const {data} = await $host.put(`api/shipments/${shipment.id}`, shipment);
    return data;
}

export const deleteShipment = async (id) => {
    const {data} = await $host.delete(`api/shipments/${id}`);
    return data;
}