import axios from 'axios'
import { API_URL } from './url';
export const instance = axios.create({
    baseURL:API_URL,
    withCredentials: true
  });


