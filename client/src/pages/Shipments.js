import React, {useEffect, useState} from 'react';
import {Button, Container, Modal, Table} from "react-bootstrap";
import {deleteShipment, fetchShipments} from "../http/shipmentsAPI";
import {useNavigate} from "react-router-dom";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {fetchProducts} from "../http/productAPI";
import {fetchStaff} from "../http/staffAPI";

const Shipments = () => {
    const navigate = useNavigate();

    const [shipments, setShipments] = useState([]);
    const [products, setProducts] = useState([]);
    const [staff, setStaff] = useState([]);
    const [deleteInfo, setDeleteInfo] = useState(null);

    const [modalInfo, setModalInfo] = useState({
        show: false,
        title: '',
        body: '',
        id: null,
    });
    const handleClose = () => setModalInfo({
        show: false,
        title: '',
        body: '',
        id: null,
    });

    const showDeleteModal = (id, ) => {
        setModalInfo({
            title: "Удаление отгрузки",
            body: `Вы действительно хотите удалить отгрузку?`,
            show: true,
            id: id
        });
    }

    useEffect(()=>{
        fetchShipments()
            .then(res=>setShipments(res.rows));
        fetchProducts()
            .then(res=>setProducts(res.rows));
        fetchStaff()
            .then(res=>setStaff(res));
    },[]);

    useEffect(()=>{
        if(deleteInfo!==null){
            deleteShipment(deleteInfo)
                .then((res)=>{
                    setDeleteInfo(null);
                    fetchShipments().then(res=>{
                        setShipments(res.rows);
                    });
                })
                .catch(err=>{
                    console.log("Ошибка удаление отгрузки");
                })
        }
    },[deleteInfo])

    const generateName = (employeeId) => {
        const employee = staff.find(employee=>employee.id===employeeId);

        if(employee)
            return `${employee.lastname} ${employee.name} ${employee.patronymic}`;

        return "";
    }

    const generateNameProduct = (id)=>{
        const body = products.find(product=>product.id===id)

        if(body)
            return body.name;

        return "";
    }

    return (
        <Container className={"d-flex flex-column mt-5"}>
            <Button className={"mt-3"} variant={"dark"} onClick={()=>navigate('/shipment')}>Создать отгрузку</Button>
            <Table striped bordered hover className={"mt-3"}>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Имя продукта</td>
                        <td>Количество</td>
                        <td>Дата</td>
                        <td>Сотрудник</td>
                        <td>Управление</td>
                    </tr>
                </thead>
                <tbody>
                {shipments.length && products.length && staff.length ? shipments.map(shipment=>(
                    <tr key={shipment.id}>
                        <td>{shipment["id"]}</td>
                        <td>{generateNameProduct(shipment.productId)}</td>
                        <td>{shipment.count}</td>
                        <td>{new Date(shipment.date).toLocaleDateString().replace('/','.')}</td>
                        <td>{generateName(shipment.staffId)}</td>
                        <td className={"d-flex justify-content-around align-items-center"} style={{height: "100%"}}>
                            <AiFillEdit style={{cursor: "pointer"}} size={"1.5em"} onClick={()=>navigate(`/shipment`,{state: shipment})}/>
                            <AiFillDelete style={{cursor: "pointer"}} size={"1.5em"} onClick={()=>showDeleteModal(shipment["id"])}/>
                        </td>
                    </tr>
                )) : null}
                </tbody>
            </Table>

            <Modal show={modalInfo.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="dark" onClick={()=>{
                        setDeleteInfo(modalInfo.id);
                        handleClose();
                    }}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Shipments;