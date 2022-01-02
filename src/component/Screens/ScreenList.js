import {ListGroup} from "react-bootstrap";

export default function ScreenList(props) {
    const screens = props.screens;

    const handleScreenSelection = (id) => {
        props.updateSelectedScreen(id);
    }

    const rows = screens.map((screen, index) => {
        return <ListGroup.Item
            key={screen.id}
            onClick={(id) => handleScreenSelection(screen.id)}
        >
            {screen.name}
        </ListGroup.Item>
    })
    return (
        <ListGroup>
            {rows}
            <ListGroup.Item className="align-center" onClick={props.showAddScreenModal}>
                Add Screen
            </ListGroup.Item>
        </ListGroup>
    )
}