import axios from "axios";
import idsrvAuth from './idsrvAuth'

class AxiosConfig{
    configure(){
        axios.defaults.baseURL = 'http://localhost:5000/api/';

        axios.interceptors.request.use(
            config => {
                if (idsrvAuth.isAuthenticated) {
                    let accessToken = idsrvAuth.accessToken;

                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );
    }
}

export default new AxiosConfig();
