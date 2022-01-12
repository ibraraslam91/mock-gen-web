import {Card} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {CgScreen} from "react-icons/cg";
import {HiUsers} from "react-icons/hi";


export default function ProjectCard(props) {
    return (
        <LinkContainer to={'/screens/' + props.project_data.id}>
            <Card style={{width: '18rem'}} key={props.project_data.id} className="box">
                <Card.Body>
                    <Card.Title>{props.project_data.name}</Card.Title>
                    <Card.Text style={{ display: 'flex' }}>
                        <div style={{ flex: 4 }}>
                            <div>
                                {props.project_data.description}
                            </div>
                            <div>
                                Created by: {props.project_data.added_by.username}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div>
                                <CgScreen/> {props.project_data.screens.length}
                            </div>
                            <div>
                                <HiUsers/> {props.project_data.users.length}
                            </div>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
    )
}