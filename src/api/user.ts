import axios from "./axios";

export interface User {
  username: string;
  password: string;
  nickname: string;
}

export function getUserInfoService() {
  // return null;
  return axios.get<User>(`/api/user/info`);
}

export function registerService(opt: Partial<User>) {
  //當nickename 沒有傳入時，預設為username
  const { username, password, nickname = username } = opt;

  return axios.post(`/api/user/register`, { username, password, nickname });
}

export function loginService(opt: Partial<User>) {
  const { username, password } = opt;
  return axios.post<{ token: string }>(`/api/user/login`, {
    username,
    password,
  });
}
