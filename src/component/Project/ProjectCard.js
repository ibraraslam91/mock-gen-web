import {Card} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

export default function ProjectCard(props){
    return (
        <LinkContainer to={'/screens/'+ props.index}>
            <Card style={{ width: '18rem' }} key={props.index} className="box">
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
    )
}