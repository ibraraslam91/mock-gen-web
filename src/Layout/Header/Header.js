import {Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

import {getUser, removeUserSession} from "../../Utils/Session/sessionUtils";

export default function Header() {

    const userData = getUser();

    const handleLogout = () => {
        removeUserSession();
        window.location.reload();
    }

    return (
        <div style={{display: "flex", justifyContent: "flex-end", padding: "10px"}}>
            <h4 style={{marginRight: "10px"}}>Hello, {userData.username}</h4>
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Settings
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item ><Link to='/team'>Team Management</Link></Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}