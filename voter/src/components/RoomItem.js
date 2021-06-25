import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RoomsService from "../services/rooms.service";

const RoomItem = (props) => {
    let room = props.room;

    return (
        <div>
            {room && room.id &&
                <li key={room.id}>
                    <Link to={"/rooms/" + room.id} className="nav-link">
                        {room.name}
                    </Link>
                </li>}
        </div>
    );
}
export default RoomItem;