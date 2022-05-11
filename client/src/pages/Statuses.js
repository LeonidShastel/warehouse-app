import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from "react-bootstrap";
import {createStatus, deleteStatus, fetchStatuses} from "../http/statusesAPI";
import {AiFillDelete} from "react-icons/ai";

const Statuses = () => {
    const [statuses, setStatuses] = useState([]);
    const [newStatus, setNewStatus] = useState("");

    const sendCreateStatus = () => {
        createStatus({name: newStatus})
            .then(res => {
                fetchStatuses()
                    .then(res => setStatuses(res))
            })
    }

    const sendDeleteStatus = (id) => {
        deleteStatus(id)
            .then(res => {
                fetchStatuses()
                    .then(res => setStatuses(res))
            })
    }

    useEffect(() => {
        fetchStatuses()
            .then(res => setStatuses(res))
    }, [])

    return (
        <Container className={"d-flex flex-column align-items-center"}>
            <h3 className={"m-3"}>Статусы продуктов</h3>
            <Form className={"d-flex"}>
                <Form.Control className={"me-3"} placeholder="Название статуса" value={newStatus}
                              onChange={e => setNewStatus(e.target.value)}/>
                <Button variant={"dark"} onClick={sendCreateStatus}>Добавить</Button>
            </Form>
            <Table striped bordered hover className={"mt-3"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th style={{width: 5}}>Управление</th>
                </tr>
                </thead>
                <tbody>
                {statuses.length ? statuses.map(status => (
                    <tr key={status.id}>
                        <td>{status.id}</td>
                        <td>{status.name}</td>
                        <td className={"d-flex justify-content-center"}><AiFillDelete style={{cursor: "pointer"}}
                                                                                      size={"1.4em"}
                                                                                      onClick={() => sendDeleteStatus(status.id)}/>
                        </td>
                    </tr>
                )) : null}
                </tbody>
            </Table>
        </Container>
    );
};

export default Statuses;