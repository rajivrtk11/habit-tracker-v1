import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const VERSION = process.env.REACT_APP_VERSION;
const ENDPOINT = 'tasks';
export class TaskService{
    static getTaskById(id,token) {
        return axios.get(`${BASE_URL}/${VERSION}/${ENDPOINT}/${id}`,this.getConfig(token))
    }

    static deleteTask(token,id) {
        return axios.delete(`${BASE_URL}/${VERSION}/${ENDPOINT}/${id}`,this.getConfig(token))
    }

    static updateTask(id,token, payload) {
        return axios.patch(`${BASE_URL}/${VERSION}/${ENDPOINT}/${id}`,payload,this.getConfig(token))
    }

    static createTask(token, payload, goalId) {
        return axios.post(`${BASE_URL}/${VERSION}/goals/${goalId}/${ENDPOINT}`,payload,this.getConfig(token))
    }

    static getConfig(token) {
        return {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
    }
}