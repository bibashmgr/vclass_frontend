import axios from 'axios';

// helpers
import { getToken } from './storageHandler';

// config
import { config } from '../config/config';

// endpoint mustnot start with '/'
export const apiHandler = async (
  methodType: string,
  endPoint: string,
  payload?: null | object | FormData,
  isFormData?: null | boolean,
  token?: null | string
) => {
  return await axios({
    method: methodType,
    baseURL: config.SERVER_BASE_URL,
    url: endPoint,
    data: payload,
    headers: {
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      'Access-Control-Allow-Origin': config.SERVER_BASE_URL,
      'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      Authorization: `Bearer ${token || getToken()}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
