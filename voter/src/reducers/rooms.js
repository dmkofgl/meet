import {
    GET_ALL_ROOMS_FAIL,
    GET_ALL_ROOMS_SUCCESS
} from "../actions/types";


const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_ROOMS_SUCCESS:
            return {
                ...state,
                message: payload
            };
        case GET_ALL_ROOMS_FAIL:
            console.debug(payload);
            return {
                ...state
            };
        default:
            return state;
    }
}