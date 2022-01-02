import React from 'react';
import {Navigate} from 'react-router-dom';

import {isLoggedIn} from "../Session/sessionUtils";

function PrivateRoute({children}) {
    return isLoggedIn() ? children : <Navigate to="/login"/>;
}

export default PrivateRoute