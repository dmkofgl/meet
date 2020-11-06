import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (username, phone) => {
  return axios.post(API_URL + "signup", {
   phone: phone,
   login: username
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      login:username,
      phone: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

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
};