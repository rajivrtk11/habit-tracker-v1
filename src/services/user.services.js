import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const VERSION = process.env.REACT_APP_VERSION;
const ENDPOINT = 'users';
export class UserService{
    static login(payload) {
        return axios.post(`${BASE_URL}/${VERSION}/${ENDPOINT}/login`,payload)
    }

    static signup(payload) {
        return axios.post(`${BASE_URL}/${VERSION}/${ENDPOINT}/signup`,payload)
    }
}