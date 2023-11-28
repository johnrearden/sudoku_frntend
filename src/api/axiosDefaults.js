import axios from 'axios';

axios.defaults.baseURL = 'https://drf-walkthrough-jr-a4bd10db8e16.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();