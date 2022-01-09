import {useParams} from "react-router-dom";


export default function ProjectSetting() {

    const params = useParams();

    return (
        <>
            <h1>Project Setting {params.projectId}</h1>
        </>
    )
}