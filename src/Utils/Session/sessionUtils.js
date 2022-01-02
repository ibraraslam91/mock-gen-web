export const getUser = () =>{
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const removeUserSession = () => {
    sessionStorage.removeItem('user');
}

export const getAccessToken = () => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) return JSON.parse(accessToken);
    else return null;
}

export const setUserSession = (user, roles, access, refresh) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('roles', JSON.stringify(roles));
    sessionStorage.setItem('access_token', JSON.stringify(access));
    sessionStorage.setItem('refresh_roles', JSON.stringify(refresh));
}

export const isLoggedIn = () => {
    const userStr = sessionStorage.getItem('user');
    console.log("isLoggedIn", !!userStr);
    return !!userStr;
}