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
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    }

    const rows = layers.map((layer, index) => {
        return (
            <ListGroup.Item key={layer.id}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    Layer: {layer.id}
                    <div>
                        <BiLayerMinus onClick={(id) => handleDeleteLayer(layer.id)}/>
                    </div>
                </div>
            </ListGroup.Item>
        )
    })

    return (
        <ListGroup>
            {rows}
        </ListGroup>
    )
}