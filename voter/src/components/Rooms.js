import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RoomsService from "../services/rooms.service";

const Rooms = () => {

    const [allRooms, setAllAvailableRooms] = useState("");

    useEffect(() => {
        RoomsService.getAllRooms().then(
            (response) => {
                console.debug(response)
                setAllAvailableRooms(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setAllAvailableRooms(_content);
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

            <ul>
                {allRooms &&
                    allRooms.map((room, index) =>
                        <li key={index}>
                            <div> {room.name}
                                <ul>
                                    {room.clients.map((client, index) =>
                                        <li key={index}>{client.login}</li>)}
                                </ul>
                            </div>
                        </li>)}
                {!allRooms && <strong> Nope</strong>}
            </ul>
        </div>
    );
};
export default Rooms;