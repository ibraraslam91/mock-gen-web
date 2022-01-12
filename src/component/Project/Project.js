import React, {useEffect, useState} from "react";
import axios from "axios";

import ProjectGrid from "./ProjectGrid";
import AddProjectModal from "./AddProjectModal";
import {getAccessToken} from "../../Utils/Session/sessionUtils";
import {BASE_URL} from "../../Constants";
import Header from "../../Layout/Header/Header";

export default function Project() {
    const [projectsData, setProjectsData] = useState([]);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const handleCloseAddProjectModal = () => {
        setShowAddProjectModal(false)
        window.location.reload();
    };
    const handleOpenAddProjectModal = () => setShowAddProjectModal(true);

    useEffect(() => {
        const projects_url = BASE_URL + "/mocks/projects/";
        axios.get(projects_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            setProjectsData(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);
    return (
        <div className="Project">
            <div style={{display: "flex", justifyContent: "space-between", marginTop:"10px"}}>
                <div>
                    <h3 className="page-title">Projects</h3>
                </div>
                <Header/>
            </div>

            <div>
                <AddProjectModal
                    showAddProjectModal={showAddProjectModal}
                    handleCloseAddProjectModal={handleCloseAddProjectModal}
                />
            </div>
            <br/>
            <div className="project-container">
                <ProjectGrid projects={projectsData} showAddProjectModal={handleOpenAddProjectModal}/>
            </div>
        </div>
    )
}