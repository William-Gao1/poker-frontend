import axios from '../api/axios';
import store from '../redux/store';
import { setUser } from '../redux/User/user.actions';

export const login  = async (email, password) => {
    const response = await axios.post('/user/login', {
        email,
        password
    });
    document.cookie = `${process.env.REACT_APP_TOKEN_NAME}=${response.data.token.token}; expires=${response.data.token.expiresAt}`;
    store.dispatch(setUser(response.data.user))
}

export const logout  = async () => {
    document.cookie = `${process.env.REACT_APP_TOKEN_NAME}=; max-age=-1`
    store.dispatch(setUser(null));
    
}

export const isLoggedIn = () => {
    var dc = document.cookie;
    var prefix = `${process.env.REACT_APP_TOKEN_NAME}=`;
    var begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return false;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end === -1) {
            end = dc.length;
        }
    }
    return true;
}