import axios from 'axios';

const apiUrl = 'http://3.38.226.166:8080/api';

export const instance = axios.create({
  baseURL: apiUrl,
  // withCredentials: true, // 백에서 CORS를 전부 열어두었기 때문에 없어도 된다
});
