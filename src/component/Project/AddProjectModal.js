import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {getAccessToken} from "../../Utils/Session/sessionUtils";
import {BASE_URL} from "../../Constants";


export default function AddProjectModal(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const showModal = props.showAddProjectModal;
    const handleCloseModal = () => {
        props.handleCloseAddProjectModal();
    }
    const handleSubmit = () => {
        const projects_url = BASE_URL + "/mocks/projects/";
        axios.post(projects_url, {
            name: name,
            description: description
        }, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(resp => {
            props.handleCloseAddProjectModal();
        }).catch(error => {
            console.log(error);
        })
        props.handleCloseAddProjectModal();
    }

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Project Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Project Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>Add Project</Button>
            </Modal.Footer>
        </Modal>
    )
}