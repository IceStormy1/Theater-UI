import axios from 'axios';

class AuthService {
    baseUrl = 'account/';

    login(user) {
        return axios.post( this.baseUrl + 'login',
            {
                username: user.username,
                password: user.password
                 },)
            .then(response => {
                if (response.data) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    localStorage.setItem('id', response.data.id);
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
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
            gender: user.gender?.code,
            birthDate: user.birthDate,
            photoId: user.photoId
        });
    }
}

export default new AuthService();
