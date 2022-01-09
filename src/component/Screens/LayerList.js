import axios from "axios";
import {ListGroup} from "react-bootstrap";
import {BiLayerMinus} from "react-icons/bi";

import {getAccessToken} from "../../Utils/Session/sessionUtils";
import {BASE_URL} from "../../Constants";

export default function LayerList(props) {
    const layers = props.layers;

    const handleDeleteLayer = (id) => {
        const delete_layer_url = BASE_URL + "/mocks/layers/" + id;
        axios.delete(
            delete_layer_url,
            {
                headers: {
                    "Authorization": "Bearer " + getAccessToken()
                }
            }
        ).then(response => {
            console.log(response);
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });

        console.log(id);
    }

    const rows = layers.map((layer, index) => {
        return (
            <ListGroup.Item key={layer.id}>
                Layer: {layer.id}
                <BiLayerMinus onClick={(id) => handleDeleteLayer(layer.id)}/>
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup>
            {rows}
        </ListGroup>
    )
}