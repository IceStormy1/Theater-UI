import axios  from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.interceptors.request.use(
    config => {
        const user = localStorage.getItem('user');

        if (user) {
            let accessToken = JSON.parse(user).accessToken;

            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
