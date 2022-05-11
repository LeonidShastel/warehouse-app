import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {fetchProducts} from "../http/productAPI";
import {Button, Container, Form} from "react-bootstrap";
import {fetchStaff} from "../http/staffAPI";
import {createShipment, editShipment} from "../http/shipmentsAPI";

const EditShipment = () => {
    const [currentShipment, setCurrentShipment] = useState({})
    const [staff, setStaff] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState("");
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState("");

    const navigate = useNavigate();

    const setProductId = (productName) =>{
        const product = products.find(product=>product.name===productName)
        setCurrentShipment({...currentShipment, productId: product.id});
        setCurrentProduct(productName.name);
    }

    const setEmployeeId = (employee) => {
        const body = staff.find(el=>el.name===employee[1] && el.lastname===employee[0] && el.patronymic === employee[2])
        setCurrentShipment({...currentShipment, staffId: body.id});
        setCurrentEmployee(`${body.lastname} ${body.name} ${body.patronymic}`);
    }

    useEffect(()=>{
        fetchProducts()
            .then(res=>setProducts(res.rows));
        fetchStaff()
            .then(res=>setStaff(res));
    },[])

    const sendBody = () => {
        const body = {
            ...currentShipment,
            date: new Date(currentShipment.date.split('.').reverse().join('-')).toJSON()
        }

        console.log(body)
        if(body.id===0)
            createShipment(body)
                .then(()=>navigate('/shipments'))
        else
            editShipment(body)
                .then(()=>navigate('/shipments'))
    }

    const {state} = useLocation();

    useEffect(() => {
        if(products.length && staff.length){
            setCurrentShipment(state ? {
                ...state,
                date: new Date(state.date).toLocaleDateString()
            } : {
                id: 0,
                productId: products[0].id,
                count: 0,
                staffId: staff[0].id,
                date: new Date().toLocaleDateString()
            })
        }

    }, [state, products, staff]);

    useEffect(()=>{
        if(Object.keys(currentShipment).length){
            const body = staff.find(el=>currentShipment.staffId===el.id);
            setCurrentEmployee(`${body.lastname} ${body.name} ${body.patronymic}`);
        }
    },[currentShipment]);

    return (
        <>
            {Object.keys(currentShipment).length && staff.length && products.length ?
                <Container className={"d-flex flex-column align-items-center"}>
                    <h3 className={"m-3"}>{currentShipment["id"] ? `Изменение отгрузки` : `Создание отгрузки`}</h3>
                    <Form className={"w-75"}>
                        <Form.Group className="mb-3" controlId="formBasicProduct">
                            <Form.Label>Имя продукта</Form.Label>
                            <Form.Select onChange={e=>{setProductId(e.target.value)}} value={currentProduct}>
                                {products.length ? products.map(product=><option key={product.id} id={`product_${product.id}`}>{product.name}</option> ) : null}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCount">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control type={"number"} value={currentShipment.count} onChange={e=>setCurrentShipment({...currentShipment, count: +e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDateProduction">
                            <Form.Label>Дата отгрузки</Form.Label>
                            <Form.Control placeholder="Введите дату"
                                          value={currentShipment.date.replace('/', '.')}
                                          onChange={el => setCurrentShipment({
                                              ...currentShipment,
                                              date: el.target.value
                                          })}/>
                            <Form.Text>Введите дату формата dd.mm.yyyy</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmployee">
                            <Form.Label>Имя сотрудника</Form.Label>
                            <Form.Select onChange={e=>setEmployeeId(e.target.value.split(' '))} value={currentEmployee}>
                                {staff.length ? staff.map(employee=><option key={employee.id}>{employee.lastname} {employee.name} {employee.patronymic}</option> ) : null}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="dark" onClick={sendBody}>
                            Сохранить
                        </Button>
                    </Form>
                </Container>
                : null}
        </>
    );
};

export default EditShipment;