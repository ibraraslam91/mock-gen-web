import axios from "axios";

import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {getAccessToken} from "../../Utils/Session/sessionUtils";
import {BASE_URL} from "../../Constants";
import Form from "react-bootstrap/Form";

import "./ProjectSetting.css"
import Button from "react-bootstrap/Button";
import Header from "../../Layout/Header/Header";


export default function ProjectSetting() {

    const params = useParams();
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [projectUsers, setProjectUsers] = useState([]);
    const [userTeam, setUserTeam] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const updateSelectedUser = (users, team) =>{
        const options = team.map( (user) => {
            return {
                value: user.id,
                label: user.username,
                selected: users.includes(user.id)
            }
        });
        return setSelectedUsers(options);
    };

    const getUserTeam = async () => {
        const get_user_team_url = BASE_URL + "/api/users/";
        return axios.get(get_user_team_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        })
    }

    const getProjectData = async () => {
        const project_detail_url = BASE_URL + "/mocks/projects/" + params.projectId;
        return axios.get(project_detail_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        })
    }

    useEffect( async () => {
        const projectData = await getProjectData();
        const userTeamData = await getUserTeam();

        setProjectName(projectData.data.name);
        setProjectDesc(projectData.data.description);
        setProjectUsers(projectData.data.users);
        setUserTeam(userTeamData.data);
        updateSelectedUser(projectData.data.users, userTeamData.data);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const update_project_url = BASE_URL + "/mocks/projects/" + params.projectId + "/";
        axios.put(update_project_url, {
            name: projectName,
            description: projectDesc,
            users: projectUsers
        }, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        })
    };

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", marginTop:"10px"}}>
                <div>
                    <h1>Project Setting ({projectName})</h1>
                </div>
                <Header/>
            </div>
            <div className="project-update-form">
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="name"
                            placeholder="Enter Name"
                            value={projectName}
                            onChange={e =>setProjectName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            autoFocus
                            type="desc"
                            placeholder="Enter Description"
                            value={projectDesc}
                            onChange={e =>setProjectDesc(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Project Contributor</Form.Label>
                        <Form.Control multiple
                                      as="select"
                                      onChange={e => setProjectUsers([].slice.call(e.target.selectedOptions).map(item => parseInt(item.value)))}>
                            {
                                selectedUsers.map((user, index) =>
                                    <option selected={user.selected} key={user.value} value={user.value}>
                                    {user.label}
                                    </option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button size="lg" type="submit">
                            Update Project
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}