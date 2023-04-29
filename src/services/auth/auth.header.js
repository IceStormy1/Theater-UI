export default function authHeader() {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken != null) {
        return { Authorization: 'Bearer ' + accessToken };
    }

    return {};
}
