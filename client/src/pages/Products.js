import React, {useEffect, useState} from 'react';
import {deleteProduct, fetchProducts} from "../http/productAPI";
import {Button, Container, Modal, Table, Form} from "react-bootstrap";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {useNavigate} from 'react-router-dom';
import {fetchStatuses} from "../http/statusesAPI";

const Products = () => {
    const navigate = useNavigate();

    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([]);
    const [deleteInfo, setDeleteInfo] = useState(null);
    const [statuses, setStatuses] = useState([]);
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

    const showDeleteModal = (id, name) => {
        setModalInfo({
            title: "Удаление предмета",
            body: `Вы действительно хотите удалить продукт: ${name}`,
            show: true,
            id: id
        });
    }

    useEffect(() => {
        if (deleteInfo !== null) {
            deleteProduct(deleteInfo)
                .then((res) => {
                    setDeleteInfo(null);
                    console.log(res);
                    fetchProducts().then(res => {
                        setProducts(res.rows);
                    });
                })
                .catch(err => {
                    console.log("Ошибка удаление продукта");
                })
        }
    }, [deleteInfo])

    useEffect(() => {
        fetchProducts().then(res => {
            setProducts(res.rows);
            setFilteredProducts(res.rows);
        });
        fetchStatuses().then(res => {
            setStatuses(res);
        })
    }, [])

    const filterProductsByStatus = (e) =>{
        const status = statuses.find(status=> status.name===e.target.value);
        setFilteredProducts(products.filter(product=>product.statusId===status.id))
    }

    const filterProductsByDateExpiration = () =>{
        setFilteredProducts(products.slice().sort((a,b)=>new Date(a["date_expiration"])-new Date(b["date_expiration"])))
    }

    return (
        <Container className={"d-flex flex-column mt-5 "}>
            <Button className={"mt-3"} variant={"dark"} onClick={() => navigate('/product')}>Создать товар</Button>
            {filteredProducts.length ?
                <Container>
                    <Container className={"d-flex mt-2 justify-content-around"}>
                        <Form.Select onChange={filterProductsByStatus} className={"w-25"}>
                            {statuses.length ? statuses.map(employee=><option key={employee.id}>{employee.lastname} {employee.name} {employee.patronymic}</option> ) : null}
                        </Form.Select>
                        <Button variant={"dark"} className={"w-25"} onClick={filterProductsByDateExpiration}>
                            Сортировать по сроку годности
                        </Button>
                        <Button variant={"dark"} className={"w-25"} onClick={()=>setFilteredProducts(products)}>
                            Сбросить настройки
                        </Button>
                    </Container>
                    <Table striped bordered hover className={"mt-3"}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Вес (кг)</th>
                            <th>Дата производства</th>
                            <th>Срок годности</th>
                            <th>Потрачено компонентов (кг)</th>
                            <th>Стоимость</th>
                            <th>Статус</th>
                            <th>Управление</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredProducts.length && statuses.length && filteredProducts.map(el => (
                                <tr key={el["id"]}>
                                    <td>{el["id"]}</td>
                                    <td>{el["name"]}</td>
                                    <td>{el["weight"]}</td>
                                    <td>{new Date(el["date_production"]).toLocaleDateString().replace('/', '.')}</td>
                                    <td>{new Date(el["date_expiration"]).toLocaleDateString().replace('/', '.')}</td>
                                    <td>{el["consumed_components"]}</td>
                                    <td>{el["price"]}</td>
                                    <td>{statuses.find(status => status.id === el["statusId"]).name}</td>
                                    <td className={"d-flex justify-content-around align-items-center"}
                                        style={{height: "100%"}}>
                                        <AiFillEdit style={{cursor: "pointer"}} size={"1.5em"}
                                                    onClick={() => navigate(`/product`, {state: el})}/>
                                        <AiFillDelete style={{cursor: "pointer"}} size={"1.5em"}
                                                      onClick={() => showDeleteModal(el["id"], el["name"])}/>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table></Container> :
                <h4 className={"m-auto mt-3"}>Товаров нет</h4>
            }

            <Modal show={modalInfo.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalInfo.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="dark" onClick={() => {
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

export default Products;