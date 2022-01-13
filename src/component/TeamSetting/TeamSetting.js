import {Button, ListGroup} from "react-bootstrap";

import TeamMemberCard from "./TeamMemberCard";
import React, {useEffect, useState} from "react";
import {BASE_URL} from "../../Constants";
import axios from "axios";
import {getAccessToken} from "../../Utils/Session/sessionUtils";
import AddTeamMemberModal from "./AddTeamMemberModal";

export default function TeamSetting() {

    const [userTeam, setUserTeam] = useState( []);
    const [showAddMember, setShowAddMember] = useState(false);

    const handleOpenAddMemberModal = () => setShowAddMember(true);

    const handleCloseAddMemberModal = () => {
      setShowAddMember(false);
        window.location.reload();
    };

    const userCards = userTeam.map( (user, index) =>
        <ListGroup.Item style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <TeamMemberCard
                username={user.username}
                email={user.email}
                roles={user.groups}
            />
        </ListGroup.Item>
    );

    useEffect( () => {
        const team_list_url = BASE_URL + '/api/users/'
        axios.get(team_list_url, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            setUserTeam(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    return (
        <>
            <h1>Manage Team</h1>
            <Button variant="primary" onClick={handleOpenAddMemberModal}>Add Team Member</Button>
            <AddTeamMemberModal
                showTeamMemberModal={showAddMember}
                handleCloseModal={handleCloseAddMemberModal}
            />
            <div>
                <ListGroup>
                    {userCards}
                </ListGroup>
            </div>
        </>
    )
}