import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {setUserSession} from "../../Utils/Session/sessionUtils";
import {BASE_URL} from "../../Constants";

import "./Login.css"

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const login_url = BASE_URL + "/users/login/";
        axios.post(login_url, {
            email: email,
            password: password
        }, {withCredentials: true}).then(resp => {
            setUserSession(
                resp.data.user,
                resp.data.roles,
                resp.data.tokens.access,
                resp.data.tokens.refresh
            );
            navigate('/');
        }).catch(error => {
            console.log(error);
            console.log(error.response.status)
            console.log(error.response.data)
        })
    }
    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button size="lg" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}


