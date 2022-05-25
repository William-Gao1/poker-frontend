import axios from '../api/axios';
import store from '../redux/store';
import { setUser } from '../redux/User/user.actions';

export const login = async (email, password) => {
    const response = await axios.post('/user/login', {
        email,
        password
    });
    document.cookie = `${process.env.REACT_APP_TOKEN_NAME}=${response.data.token.token}; expires=${response.data.token.expiresAt}`;
    store.dispatch(setUser(response.data.user))
}

export const createUser = async (username, email, password) => {
    const response = await axios.post('/user', {
        username,
        email,
        password
    })
    document.cookie = `${process.env.REACT_APP_TOKEN_NAME}=${response.data.token.token}; expires=${response.data.token.expiresAt}`;
    store.dispatch(setUser(response.data.user))
}

export const logout = async () => {
    document.cookie = `${process.env.REACT_APP_TOKEN_NAME}=; max-age=-1`
    store.dispatch(setUser(null));

}

export const isLoggedIn = () => {
    if (getToken()){
        return true;
    }
    return false;
}

export const getToken = () => {
    const name = process.env.REACT_APP_TOKEN_NAME + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}