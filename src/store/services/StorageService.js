export class StorageService {
    static getToken() {
        return localStorage.getItem('token');
    }
    static setToken(token) {
        localStorage.setItem('token', token);
    }
    static clearToken() {
        localStorage.removeItem('token');
    }
}