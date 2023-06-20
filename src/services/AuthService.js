import httpService from "./HttpService";
import AppConfig from "AppConfig";

const apiEndpoint = AppConfig.apiUrl + "/auth.php";
const tokenData = "tokenData";
const expireTime = 18000;

httpService.setJwt(getJwt());

export async function login(username, password) {
  const { data: jwt } = await httpService.post(apiEndpoint, {
    username,
    password,
  });
  loginWithJwt(jwt.token);
}

export function loginWithJwt(jwt) {
  const item = {
    token: jwt,
    createdAt: new Date().getTime(),
  };
  localStorage.setItem(tokenData, JSON.stringify(item));
}

export function logout() {
  localStorage.removeItem(tokenData);
}

export function getJwt() {
  return JSON.parse(localStorage.getItem(tokenData));
}

export function getCurrentUser() {
  try {
    let data = getJwt();
    if (data.token)
      if ((new Date().getTime() - data.createdAt) / 1000 > expireTime)
        return null;
      else return data.token;
    return null;
  } catch (ex) {
    return null;
  }
}

const authService = { login, loginWithJwt, logout, getCurrentUser, getJwt };
export default authService;
