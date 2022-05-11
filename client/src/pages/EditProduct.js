import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Image} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {createProduct, editProduct} from "../http/productAPI";
import {fetchStatuses} from "../http/statusesAPI";

const EditProduct = () => {
    const navigate = useNavigate();

    const [currentProduct, setCurrentProduct] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('');

    const changeStatus = (statusName) => {
        setCurrentProduct({
            ...currentProduct,
            statusId: statuses.find((status) => status.name === statusName).id
        });
        setCurrentStatus(statuses.find((status) => status.name === statusName).name);
    }

    const sendBody = () => {
        const formData = new FormData();
        for (let prop in currentProduct)
            formData.append(prop, currentProduct[prop]);
        formData.append("date_production", `${new Date(currentProduct.date_production.split('.').reverse().join('-')).toJSON()}`);
        formData.append("date_expiration", `${new Date(currentProduct.date_expiration.split('.').reverse().join('-')).toJSON()}`);

        if (currentProduct.id === 0)
            createProduct(formData)
                .then(() => navigate('/'))
        else
            editProduct(formData)
                .then(() => navigate('/'))
    }

    const {state} = useLocation();

    useEffect(() => {
        fetchStatuses().then(res => setStatuses(res))
    }, [])

    useEffect(() => {
        if (statuses.length && currentProduct.statusId)
            setCurrentStatus(statuses.find((status) => status.id === currentProduct.statusId).name);
        else if (statuses.length && !currentProduct.statusId) {
            setCurrentStatus(statuses[0].name);
            setCurrentProduct({...currentProduct, statusId: statuses[0].id});
        }
    }, [statuses])

    useEffect(() => {
        setCurrentProduct(state ? {
            ...state,
            date_production: new Date(state.date_production).toLocaleDateString().replace('/', '.'),
            date_expiration: new Date(state.date_expiration).toLocaleDateString().replace('/', '.')
        } : {
            id: 0,
            name: "",
            weight: 0,
            date_production: new Date().toLocaleDateString(),
            date_expiration: new Date().toLocaleDateString(),
            consumed_components: 0,
            price: 0,
            statusId: 0,
            img: null
        });
    }, [state])

    return (
        <>
            {Object.keys(currentProduct).length && statuses.length ?
                <Container className={"d-flex flex-column align-items-center"}>
                    <h3 className={"m-3"}>{currentProduct["name"] ? `Изменение продукта` : `Создание продукта`}</h3>
                    <Container className={"w-100 d-flex justify-content-center"}>
                        {typeof(currentProduct.img)==="string" ?
                            <Container className={"w-25"}><Image height={""} src={process.env.REACT_APP_API_URL + currentProduct.img}/></Container>
                            : null
                        }
                        <Form className={"w-75"}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Имя продукта</Form.Label>
                                <Form.Control placeholder="Введите имя" value={currentProduct.name}
                                              onChange={el => setCurrentProduct({
                                                  ...currentProduct,
                                                  name: el.target.value
                                              })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicImage">
                                <Form.Label>Изображение</Form.Label>
                                <Form.Control placeholder="Выберите изображение" type="file"
                                              onChange={(e) => setCurrentProduct({
                                                  ...currentProduct,
                                                  img: e.target.files[0]
                                              })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicWeight">
                                <Form.Label>Вес (кг)</Form.Label>
                                <Form.Control placeholder="Введите вес"
                                              value={currentProduct.weight}
                                              onChange={el => setCurrentProduct({
                                                  ...currentProduct,
                                                  weight: +el.target.value
                                              })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDateProduction">
                                <Form.Label>Дата производства</Form.Label>
                                <Form.Control placeholder="Введите дату"
                                              value={currentProduct.date_production.replace('/', '.')}
                                              onChange={el => setCurrentProduct({
                                                  ...currentProduct,
                                                  date_production: el.target.value
                                              })}/>
                                <Form.Text>Введите дату формата dd.mm.yyyy</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDateProduction">
                                <Form.Label>Срок годности</Form.Label>
                                <Form.Control placeholder="Введите дату"
                                              value={currentProduct.date_expiration.replace('/', '.')}
                                              onChange={el => setCurrentProduct({
                                                  ...currentProduct,
                                                  date_expiration: el.target.value
                                              })}/>
                                <Form.Text>Введите дату формата dd.mm.yyyy</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicСonsumedСomponents">
                                <Form.Label>Потрачено компонентов (кг)</Form.Label>
                                <Form.Control placeholder="Введите вес"
                                              value={currentProduct.consumed_components}
                                              onChange={el => setCurrentProduct({
                                                  ...currentProduct,
                                                  consumed_components: +el.target.value
                                              })}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasiPrice">
                                <Form.Label>Цена (руб)</Form.Label>
                                <Form.Control placeholder="Введите цену"
                                              value={currentProduct.price}
                                              onChange={el => setCurrentProduct({
                                                  ...currentProduct,
                                                  price: +el.target.value
                                              })}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Статус товара</Form.Label>
                                <Form.Select onChange={el => changeStatus(el.target.value)}
                                             value={currentStatus}
                                >
                                    {statuses.length ? statuses.map(status => (
                                        <option key={status.id}>{status.name}</option>)) : null}
                                </Form.Select>
                            </Form.Group>

                        </Form>
                    </Container>

                        <Button variant="dark" onClick={sendBody}>
                            Сохранить
                        </Button>
                </Container>
                : null}
        </>
    );
};

export default EditProduct;