import {Card, Col, Container, Row} from "react-bootstrap";
import React from "react";

import ProjectCard from "./ProjectCard";

export default function ProjectGrid(props) {
    const projects = props.projects;
    const projectCols = projects.map( (project, index) =>{
            return (
                <Col xs="12" md="6" lg="4" key={project.id}>
                    <ProjectCard name={project.name} description={project.description} index={project.id}/>
                </Col>
            )
    });

    return (
        <Container>
            <Row>
                {projectCols}
                <Col xs="12" md="6" lg="4">
                    <Card style={{ width: '100%', height:'100%' }} className="box" onClick={props.showAddProjectModal}>
                        <Card.Body>
                            <Card.Title>Add Project</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}