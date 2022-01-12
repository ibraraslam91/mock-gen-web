import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {LinkContainer} from 'react-router-bootstrap'

import "./Screen.css"

import {getAccessToken} from "../../Utils/Session/sessionUtils";
import AddScreenModal from "./AddScreenModal";
import ScreenList from "./ScreenList";
import LayerList from "./LayerList";
import MockCanvas from "./MockCanvas";
import {BASE_URL} from "../../Constants";

import {IoSettingsSharp} from "react-icons/io5";

export default function ProjectScreens() {
    const params = useParams();
    const [projectName, setProjectName] = useState("");
    const [screens, setScreens] = useState([]);
    const [layers, setLayers] = useState([]);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [showAddScreenModal, setShowAddScreenModal] = useState(false);

    const handleCloseAddScreenModal = () => {
        setShowAddScreenModal(false)
        window.location.reload();
    };
    const handleOpenAddScreenModal = () => setShowAddScreenModal(true);
    const updateSelectedScreen = (data) => {
        setSelectedScreen(data)
    };

    useEffect(() => {
        const project_detail_url = BASE_URL + "/mocks/projects/" + params.projectId + "/screens/" + selectedScreen;
        axios.get(project_detail_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            setLayers(response.data.layers);
        }).catch(error => {
            console.log(error);
        });
    }, [selectedScreen]);

    useEffect(() => {
        const project_detail_url = BASE_URL + "/mocks/projects/" + params.projectId;
        axios.get(project_detail_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            setProjectName(response.data.name);
            setScreens(response.data.screens);
            if (response.data.screens.length !== 0) {
                setSelectedScreen(response.data.screens[0].id);
            }
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <div style={{ marginTop:"10px"}}>
                <span style={{display: "flex"}}>
                    <h1 className="page-title">
                        {projectName}
                    </h1>
                    <LinkContainer to={'/setting/' + params.projectId}>
                        <span>
                            <span style={{position: 'absolute', marginTop: '25px', marginLeft: '10px'}}>
                                <IoSettingsSharp/>
                            </span>
                        </span>
                    </LinkContainer>
                </span>

            </div>
            <br/>
            <div>
                <AddScreenModal
                    showAddScreenModal={showAddScreenModal}
                    handleCloseAddScreenModal={handleCloseAddScreenModal}
                    projectId={params.projectId}
                />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ScreenList
                            screens={screens}
                            updateSelectedScreen={updateSelectedScreen}
                            showAddScreenModal={handleOpenAddScreenModal}
                        />
                    </div>
                    <div className="col-8">
                        <MockCanvas
                            projectId={params.projectId}
                            selectedScreen={selectedScreen}
                            layers={layers}
                            mockAdded={handleCloseAddScreenModal}
                        />
                    </div>
                    <div className="col">
                        <LayerList layers={layers}/>
                    </div>
                </div>
            </div>
        </>
    );
}