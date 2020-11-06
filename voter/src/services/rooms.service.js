import axios from "axios";

import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/rooms/";

 
  
const getAllRooms = () => {
    return axios
      .get(API_URL, { headers: authHeader() });
  };
  
  
  export default {
    getAllRooms,
  };