import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Button, Form} from 'react-bootstrap'

import { NameForm } from '../components/NameImport';
import { DataRangeInput } from "./DataRangeInput";

const EventModal = (props) => {
    const [event, setEvent] = useState(props.event);
    const [start, setStart] = useState(event.start);
    const [end, setEnd] = useState(event.end);
    const [title, setTitle] = useState(event.title);

    function removeDate() {
        props.removeEvent(props.event.id);
        props.closeModal();
    }
    function closeModal() {
        let event = { ...props.event, start, end, title };
        props.updateEvent(event);
        props.closeModal();
    }
    function saveEvent() {
        let event = { ...props.event, start, end, title };
        props.updateEvent(event);
    }
    function handleChangeName(event) {
        setTitle(event.target.value)
    }

    return (
        <div>
            { <div>
                <h2 >Hello</h2>
                {
                    console.log(event)}
                {/* <p>{props.event.start}</p> */}
                <Form>
                    <Button variant="primary" onClick={saveEvent}>save</Button >
                    <Button variant="secondary" onClick={closeModal}>close</Button >
                    <Button variant="danger" onClick={removeDate}>remove</Button >
                    <NameForm handleChange={handleChangeName} text={"Title"} value={title} />
                    <div>
                        <DataRangeInput onChange={setStart} value={start} />
                        <span> - </span>
                        <DataRangeInput onChange={setEnd} value={end} />
                    </div>
                </Form>
            </div>}
        </div>
    );
}

export default EventModal;