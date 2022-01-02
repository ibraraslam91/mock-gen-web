import {ListGroup} from "react-bootstrap";

export default function LayerList(props) {
    const layers = props.layers;
    const rows = layers.map((layer, index) => {
        return (
            <ListGroup.Item key={layer.id}> Layer: {layer.id}</ListGroup.Item>
        )
    })

    return (
        <ListGroup>
            {rows}
        </ListGroup>
    )
}