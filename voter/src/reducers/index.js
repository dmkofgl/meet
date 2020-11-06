import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import rooms from "./rooms";

export default combineReducers({
  auth,
  message
});