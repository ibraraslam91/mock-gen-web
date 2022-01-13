import {Button, Modal} from "react-bootstrap";

import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {BASE_URL} from "../../Constants";
import axios from "axios";
import {getAccessToken} from "../../Utils/Session/sessionUtils";


export default function AddTeamMemberModal(props) {

    const showModal = props.showTeamMemberModal;

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRole, setUserRole] = useState(1);

    const [systemRoles, setSystemRoles] = useState([]);

    const handleSubmit = () => {
        const create_user_url = BASE_URL + "/api/users/";
        axios.post(create_user_url, {
            username: userName,
            email: userEmail,
            password: userPassword,
            groups: [userRole]
        }, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            props.handleCloseModal();
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        const groups_list_url = BASE_URL + "/api/groups/";
        axios.get(groups_list_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            setSystemRoles(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <Modal show={showModal} onHide={props.handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Team Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        placeholder="Enter email"
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={e => setUserPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Roles</Form.Label>
                    <Form.Control
                        as="select"
                        onChange={e => setUserRole(e.target.value)}
                    >
                        {
                            systemRoles.map((group, index) =>
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>)
                        }
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>Add Team Member</Button>
            </Modal.Footer>

        </Modal>
    )


}