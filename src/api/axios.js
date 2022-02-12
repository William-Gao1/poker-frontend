import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

instance.interceptors.request.use(
    (request) => {
        try {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith(`${process.env.REACT_APP_TOKEN_NAME}=`))
                .split('=')[1];
            request.headers.Authorization = `Bearer ${cookieValue}`;
        } catch (e) {}
        return (request);
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;