import axios from 'axios';

// helpers
import { getToken } from './storageHandler';

// config
import { config } from '../config/config';

// endpoint mustnot start with '/'
export const apiHandler = async (methodType: string, endPoint: string, payload?: null | object | FormData, ) => {
    return await axios({
        method: methodType,
        baseURL: config.BASE_URL,
        url: endPoint,
        data: payload,
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": config.BASE_URL, 
            "Authorization": `Bearer ${getToken()}`
        },
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
}