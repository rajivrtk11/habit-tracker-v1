import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const VERSION = process.env.REACT_APP_VERSION;
const ENDPOINT = 'goals';
export class GoalService{
    static getGoals(token,page) {
        return axios.get(`${BASE_URL}/${VERSION}/${ENDPOINT}?page=${page}`,this.getConfig(token))
    }

    static getGoalById(id,token) {
        return axios.get(`${BASE_URL}/${VERSION}/${ENDPOINT}/${id}`,this.getConfig(token))
    }

    static deleteGoal(token,id) {
        return axios.delete(`${BASE_URL}/${VERSION}/${ENDPOINT}/${id}`,this.getConfig(token))
    }

    static updateGoal(id,token, payload) {
        return axios.patch(`${BASE_URL}/${VERSION}/${ENDPOINT}/${id}`,payload,this.getConfig(token))
    }

    static createGoal(token, payload) {
        return axios.post(`${BASE_URL}/${VERSION}/${ENDPOINT}`,payload,this.getConfig(token))
    }

    static getConfig(token) {
        return {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
    }
}