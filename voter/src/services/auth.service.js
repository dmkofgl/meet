import axios from "axios";
const HOPE_API = "http://localhost:8080/"
const API_URL = HOPE_API + "auth/";
const API_OAUTH_URL = HOPE_API + "oauth2/authorization/";

const register = (username, phone) => {
  return axios.post(API_URL + "signup", {
    password: phone,
    name: username,
    email: username
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      email: username,
      password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("auth_token", response.data.tokenType + " " + response.data.accessToken);
      }

      return response.data;
    }).then((response) => {
      console.log(response);
      let headers = {headers:{ Authorization: response.tokenType + " " + response.accessToken }};
      axios.get(HOPE_API + "user/me", headers).then((resp) => {
        console.log(resp);
        if (resp.data.email) {
          localStorage.setItem("user",JSON.stringify(resp.data));
        }
      })
    });
};
const loginOauth = (providerName) => {
  return axios
    .get(API_OAUTH_URL + providerName, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept" } })

    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const profile = (token) => {
  console.log(token)
  return axios
    .get(HOPE_API + "users/me", { headers: { 'Authorization': 'Bearer ' + token } })

    .then((response) => {

      localStorage.setItem("user", JSON.stringify(response.data));


      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  loginOauth,
  profile,
};