import {ListGroup} from "react-bootstrap";
import {BiLayer, BiLayerPlus} from "react-icons/bi";

export default function ScreenList(props) {
    const screens = props.screens;

    const handleScreenSelection = (id) => {
        props.updateSelectedScreen(id);
    }

    const rows = screens.map((screen, index) => {
        return (
            <ListGroup.Item
                key={screen.id}
                onClick={(id) => handleScreenSelection(screen.id)}
            >
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {screen.name}
                    <div>
                        <BiLayer/> {screen.layers_count}
                    </div>
                </div>
            </ListGroup.Item>
        );
    });

    return (
        <ListGroup>
            {rows}
            <ListGroup.Item className="align-center" onClick={props.showAddScreenModal}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    Add Screen
                    <div>
                        <BiLayerPlus/>
                    </div>
                </div>
            </ListGroup.Item>
        </ListGroup>
    );
}