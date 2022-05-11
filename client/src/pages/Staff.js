import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import {createStatus, deleteStatus, fetchStatuses} from "../http/statusesAPI";
import {AiFillDelete} from "react-icons/ai";
import {createEmployee, deleteEmployee, fetchEmployee, fetchStaff} from "../http/staffAPI";

const Statuses = () => {
    const [staff, setStaff] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        lastname: "",
        patronymic: ""
    });

    const sendCreateEmployee = () => {
        createEmployee(newEmployee)
            .then(res => {
                fetchStaff()
                    .then(res => setStaff(res))
            })
    }

    const sendDeleteEmployee = (id) => {
        deleteEmployee(id)
            .then(res => {
                fetchStaff()
                    .then(res => setStaff(res))
            })
    }

    useEffect(() => {
        fetchStaff()
            .then(res => setStaff(res))
    }, [])

    return (
        <Container className={"d-flex flex-column align-items-center"}>
            <h3 className={"m-3"}>Сотрудники</h3>
            <Form className={"d-flex"}>
                <Form.Control className={"me-3"} placeholder="Фамилия" value={newEmployee.lastname}
                              onChange={e => setNewEmployee({...newEmployee, lastname: e.target.value})}/>
                <Form.Control className={"me-3"} placeholder="Имя" value={newEmployee.name}
                              onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}/>
                <Form.Control className={"me-3"} placeholder="Отчество" value={newEmployee.patronymic}
                              onChange={e => setNewEmployee({...newEmployee, patronymic: e.target.value})}/>
                <Button variant={"dark"} onClick={sendCreateEmployee}>Добавить</Button>
            </Form>
            <Table striped bordered hover className={"mt-3"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th style={{width: 5}}>Управление</th>
                </tr>
                </thead>
                <tbody>
                {staff.length ? staff.map(status => (
                    <tr key={status.id}>
                        <td>{status.id}</td>
                        <td>{status.lastname}</td>
                        <td>{status.name}</td>
                        <td>{status.patronymic}</td>
                        <td className={"d-flex justify-content-center"}><AiFillDelete style={{cursor: "pointer"}}
                                                                                      size={"1.4em"}
                                                                                      onClick={() => sendDeleteEmployee(status.id)}/>
                        </td>
                    </tr>
                )) : null}
                </tbody>
            </Table>
        </Container>
    );
};

export default Statuses;