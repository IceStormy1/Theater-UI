export default function authHeader() {
    let user = localStorage.getItem('user');

    if (user != null) {
        return { Authorization: 'Bearer ' + user.accessToken };
    }

    return {};
}
