import axios from 'axios'
import { API_URL } from './url';
import { config } from 'process';
const instance = axios.create({
    baseURL:API_URL,
    withCredentials: true
  });



// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('REQEST',config);
  
  return config;
}, function (error) {
  console.log(error,config);
  
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('RESPONSE CUTOM AXIOS',response);
  
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('error axios',error);
  
  // return Promise.reject(error);
});

export  default instance;
