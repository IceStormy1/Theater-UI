import axios from 'axios';

class AuthService {
    accessToken;
    baseUrl = 'account/';
    login(user) {
        return axios.post( this.baseUrl + 'login',
            {
                username: user.username,
                password: user.password
                 },)
            .then(response => {
                if (response.data.accessToken) {
                    //localStorage.setItem('user', JSON.stringify(response.data));

                    localStorage.setItem('accessToken', response.data.accessToken);
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('accessToken');
    }

    register(user) {
        return axios.post(this.baseUrl + 'registration', {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            phone: user.phone,
            gender: user.gender.code,
            birthDate: user.birthDate,
            photoId: user.photoId
        });
    }
}

export default new AuthService();
