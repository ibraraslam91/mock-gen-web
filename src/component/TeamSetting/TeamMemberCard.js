import {Card} from "react-bootstrap";

export default function TeamMemberCard(props) {
    return (
        <Card style={{flex: '1', padding: "10px 30px", minWidth:"800px"}} className="box" >
            <div style={{display: "flex"}}>
                <div style={{flex: "1"}}>
                    Username: {props.username}
                </div>
                <div style={{flex: "1"}}>
                    Eamil: {props.email}
                </div>
                <div style={{flex: "1"}}>
                    Roles: {props.roles.join(", ")}
                </div>
            </div>
        </Card>
    )
}