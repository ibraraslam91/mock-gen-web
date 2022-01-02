import {Group, Layer, Line, Rect, Stage} from "react-konva";
import {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, ToggleButton} from "react-bootstrap";
import axios from "axios";
import {getAccessToken} from "../../Utils/Session/sessionUtils";
import RectComponent from "./RectComponent";
import {BASE_URL} from "../../Constants";


export default function MockCanvas(props) {

    const modes = [
        {name: "Pen", value: "pen"},
        {name: "Eraser", value: "eraser"}
    ]
    const layers = props.layers;
    const [mode, setMode] = useState(modes[0].value);
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef();
    const [componentWidth, setComponentWidth] = useState(0);
    const ref = useRef(null);

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, {type: mime})
    }

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, {mode, points: [pos.x, pos.y]}]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const checkSize = () => {
        const width = props.offsetWidth;
        this.setState({
            stageWidth: width
        });
    };

    const handleGetImage = () => {
        const stage = stageRef.current;
        const layer = stage.findOne('#free-hand');
        const image = layer.toDataURL();
        const file = dataURLtoFile(image, "image.png");
        const data = new FormData();
        data.append('img', file);

        const project_detail_url = BASE_URL + "/mocks/projects/" + props.projectId + "/screens/" + props.selectedScreen + "/add_layer/";
        axios.post(project_detail_url, data, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        }).then(response => {
            console.log(response);
            props.mockAdded();
        }).catch(error => {
            console.log(error);
        })

    }


    useEffect(()=> {
        console.log("width", ref.current.offsetWidth);
        setComponentWidth(ref.current.offsetWidth)
    }, [])

    const mocks = layers.map((layer, index) => {
        const elements = layer.mock.map((elementData, i) => {
            return (
                <RectComponent
                    element={elementData["element"]}
                    x={elementData["x"]}
                    y={elementData["y"]}
                    w={elementData["w"]}
                    h={elementData["h"]}
                />
            )
        })
        return <Group id={index}>{elements}</Group>
    })

    return (
        <div>
            <div>
                <ButtonGroup className="btn-add-layer">
                    {
                        modes.map((m, index) => (
                                <ToggleButton
                                    key={index}
                                    id={`radio-${index}`}
                                    type="radio"
                                    variant='outline-success'
                                    value={m.value}
                                    checked={mode === m.value}
                                    onChange={(e) => setMode(e.currentTarget.value)}
                                >
                                    {m.name}
                                </ToggleButton>
                            )
                        )
                    }
                </ButtonGroup>
                <Button className="btn-add-layer" onClick={handleGetImage}>
                    Add Layer
                </Button>
            </div>
            <br/>
            <div ref={ref}>
                <Stage
                    width={componentWidth}
                    height={500}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={stageRef}
                >

                    <Layer id="free-hand">
                        <Rect
                            x={0}
                            y={0}
                            width={componentWidth}
                            height={500}
                            fill="#EEEEFF"
                            key="bg-rect"

                        />
                        {
                            lines.map((line, index) => (
                                <Line
                                    key={index}
                                    points={line.points}
                                    stroke="#000000"
                                    strokeWidth={line.mode === 'eraser' ? 5 : 3}
                                    tension={0.5}
                                    lineCap="round"
                                    globalCompositeOperation={
                                        line.mode === 'eraser' ? 'destination-out' : 'source-over'
                                    }
                                />
                            ))
                        }
                    </Layer>
                    <Layer id="mocks">
                        {mocks}
                    </Layer>
                </Stage>
            </div>
        </div>
    )
}