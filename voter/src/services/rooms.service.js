import axios from "axios";

import authHeader from "../auth-header";

const API_URL = "http://localhost:8080/rooms/";



const getAllRooms = () => {
    return axios
        .get(API_URL, { headers: authHeader() });
};
const getRoomById = (id) => {
    return axios
        .get(API_URL + id, { headers: authHeader() });
};
const sendRoomDates = (roomId, dates,clientId) => {
    let room = { id: roomId };
    let data = [...dates].map(x => {
        let f = { startDate: x.start, finishDate: x.end, room: room,client:{id:clientId} };
        return f
    });
    let headers = { ...authHeader(), 'Content-Type': 'application/json' };
    console.log(data)
    return axios
        .post(API_URL + roomId + "/dates", JSON.stringify(data), { headers: headers });
};


export default {
    getAllRooms, getRoomById, sendRoomDates
};