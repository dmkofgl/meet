import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RoomsService from "../services/rooms.service";
import RoomItem from "./RoomItem";

const Rooms = () => {

    const [allRooms, setAllAvailableRooms] = useState();

    useEffect(() => {
        RoomsService.getAllRooms().then(
            (response) => {
                console.debug(response)
                if (Array.isArray(response.data)) {
                    setAllAvailableRooms(response.data);
                }
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
            }
        );

    }, []);

    let getKeys = function (obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }

    return (
        <div>
            <span>Rooms:</span>
            <ul>
                {allRooms &&
                    allRooms.map((room, index) =>
                        <RoomItem room={room} />
                    )}
            </ul>
        </div>
    );
};
export default Rooms;