import {
    GET_ALL_ROOMS_FAIL,
    GET_ALL_ROOMS_SUCCESS,
    SET_MESSAGE,
} from "./types";

import RoomsService from "../services/rooms.service";

export const getAllRooms = () => (dispatch) => {
    return RoomsService.getAllRooms().then(
        (data) => {
            console.log(data);
            dispatch({
                type: GET_ALL_ROOMS_SUCCESS,
                payload: { allRooms: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: GET_ALL_ROOMS_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
