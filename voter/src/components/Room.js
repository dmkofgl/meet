import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Timeline from 'react-calendar-timeline'

import RoomsService from "../services/rooms.service";
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventModal from './EventModal'

import Modal from 'react-modal';
import { ACTION_CREATE, ACTION_UPDATE } from "../constants/eventActions";



function mapClients(c) {
    let f = { id: c.id, title: c.login };
    console.debug(f);
    return f;
}
//c={startDate, finishDate, title}
function mapTimelineDates(c, index) {

    let f = { start_time: new Date(c.startDate), end_time: new Date(c.finishDate), id: index, group: c.title };
    console.log(f)
    return f;
}
function mapCalendarDates(c, index) {
    let t = {
        start: new Date(c.startDate),
        end: new Date(c.finishDate),
        title: " ",
        id: index
    };
    return t;
}
const Room = (props) => {

    const { user: currentUser } = useSelector((state) => state.auth);
    let id = props.match.params.id;
    const [room, setRoom] = useState();
    const [userDates, setUserDates] = useState([]);
    const [index, setIndex] = useState([]);
    const [currentEvent, setCurrentEvent] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(event,action) {
        setIsOpen(true);
        event.action=action;
        setCurrentEvent(event);
    }

    function closeModal() {
        setIsOpen(false);
        setCurrentEvent(null);
    }

    const localizer = momentLocalizer(moment);

    useEffect(() => {
        RoomsService.getRoomById(id).then(
            (response) => {
                let currentRoom = response.data;
                if (currentRoom && currentRoom.clients) {
                    currentRoom.clients = currentRoom.clients.map(mapClients);
                }
                if (currentRoom && currentRoom.dates) {
                    setIndex(currentRoom.dates.length)

                    console.log(currentRoom)
                    let calendarDates = [...currentRoom.dates.filter(x => x.client && x.client.id == currentUser.client.id)];
                    let othersCalendarDates = [...currentRoom.dates.filter(x => x.client && x.client.id != currentUser.client.id)];
                    currentRoom.otherClientDates = othersCalendarDates.map((x, index) => mapTimelineDates({ ...x, title: x.client.id }, index));
                    calendarDates = calendarDates.map(mapCalendarDates)
                    console.log(calendarDates)
                    setUserDates(...userDates, calendarDates);
                    setIndex(currentRoom.otherClientDates.length + 1)
                }

                setRoom(currentRoom);

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

    const handleCreateEvent = (start) => {
        console.log(start)
        let t = {
            start: start.start,
            end: start.end,
            title: ' ',
            id: index
        };
        console.log(t)
        setUserDates([...userDates, t]);
        setIndex(index + 1);
        openModal(t,ACTION_CREATE);
    };
    const removeDate = (id) => {
        console.log(userDates);
        let newUserDates = userDates.filter(x => x.id != id);
        
        console.log(newUserDates);
        setUserDates(newUserDates);

    }
    const updateEvent = (event) => {
        console.log(event)
        if(!event.start || !event.end )
        {return;}
        let newUserDates = userDates.filter(x => x.id != event.id);
        setUserDates([...newUserDates, event]);

    }
    const combine = (userDate) => {
        let userDates = [...userDate];
        userDates = userDates.map(x => mapTimelineDates({ startDate: x.start, finishDate: x.end, title: currentUser.client.id }, x.id));
        let comb = [...room.otherClientDates, ...userDates];
        console.log(comb)
        return comb;
    }
    const handSubmit = (e) => {
        e.preventDefault();

        RoomsService.sendRoomDates(id, userDates, currentUser.client.id).then(
            (response) => {
                window.location.reload();
            }
        )
    }
    const customStyles = {
        overlay: {zIndex: 1000}
      };
    return (

        <div>
            {console.log(currentEvent)}
            {currentEvent&&currentEvent.start && <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
                style={customStyles}
            >
                <EventModal closeModal={closeModal} removeEvent={removeDate} event={currentEvent} updateEvent={updateEvent} />
            </Modal>
            }
            {console.log(userDates)}
            <Form onSubmit={handSubmit} >
                <button className="btn btn-primary btn-block">
                    <span>Send</span>
                </button>
            </Form>
            <div>
                <Calendar
                    selectable={true}
                    localizer={localizer}
                    events={userDates}
                    defaultView={Views.WEEK}

                    onSelectEvent={event => {
                        openModal(event,ACTION_UPDATE);
                        console.log(event);
                    }}
                    onSelectSlot={handleCreateEvent}
                />
            </div>
            <div>
                {room &&
                    room.clients &&

                    <Timeline groups={room.clients}
                        items={combine(userDates)}
                        defaultTimeStart={moment().day(0)}
                        defaultTimeEnd={moment().day(7)}
                    />
                }
            </div>
        </div>
    );
}
export default Room;