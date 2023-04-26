import axios from 'axios';

// helpers
import { getToken } from './storageHandler';

const BASE_URL = 'http://localhost:9999';
const HEADER = {"Content-Type": "application/json", "Access-Control-Allow-Origin": BASE_URL, "Authorization": `Bearer ${getToken()}`};

// endpoint mustnot start with '/'
export const apiHandler = async (methodType: string, endpoint: string, payload?: null | object | FormData, ) => {
    return await axios({
        method: methodType,
        baseURL: BASE_URL,
        url: endpoint,
        data: payload,
        headers: HEADER,
    }).then((res) => {
        return res.data;
    }).catch((error) => {
        return error.response.data;
    });
}