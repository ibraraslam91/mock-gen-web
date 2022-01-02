import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {getAccessToken} from "../../Utils/Session/sessionUtils";
import {BASE_URL} from "../../Constants";

export default function AddScreenModal(props) {
    const [name, setName] = useState("");
    const showModal = props.showAddScreenModal;

    const handleCloseModal = () => {
        props.handleCloseAddScreenModal();
    }

    const handleSubmit = () => {
        const projects_url = BASE_URL + "/mocks/projects/" + props.projectId +/screens/;
        axios.post(projects_url, {
            name: name,
        }, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(resp => {

        }).catch(error => {
            console.log(error);
        })
        handleCloseModal();
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
                        placeholder="Screen Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>Add Project</Button>
            </Modal.Footer>
        </Modal>
    )
}
