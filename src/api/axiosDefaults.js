import axios from 'axios';

axios.defaults.baseURL = 'https://sudoku-toy-843c4b4834cb.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();