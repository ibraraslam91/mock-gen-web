import React from 'react';
import {Navigate} from 'react-router-dom';

import {isLoggedIn} from "../Session/sessionUtils";

function RestrictedRoute({children}) {
    return isLoggedIn() ? <Navigate to="/"/> : children;
}

export default RestrictedRoute