import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/consts";
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const navigate = useNavigate();

    const redirect = (location) =>{
        // history.push(location);
        navigate(location);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav>
                    <Button variant={"dark"} onClick={()=>redirect('/')}>Продукты</Button>
                    <Button variant={"dark"} onClick={()=>redirect('/shipments')}>Отгрузки</Button>
                    <Button variant={"dark"} onClick={()=>redirect('/statuses')}>Статусы</Button>
                    <Button variant={"dark"} onClick={()=>redirect('/staff')}>Сотрудники</Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;