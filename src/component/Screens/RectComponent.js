import {Rect, Group, Text} from 'react-konva';

export default function RectComponent(props) {
    return (
        <Group>
            <Text text={props.element} x={props.x + 4}
                  y={props.y + 4}/>
            <Rect
                x={props.x}
                y={props.y}
                width={props.w}
                height={props.h}
                stroke={'black'}
                strokeWidth={2}
                globalCompositeOperation="source-over"
            />
        </Group>
    )
}

