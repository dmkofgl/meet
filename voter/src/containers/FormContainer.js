import React, { Component } from 'react';
import { NameForm } from '../components/NameImport';
import { ModeButton } from '../components/ModeButton'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'

import { InputDateContainer } from './InputDateContainer';
import moment from 'moment'

export class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.onClickAddDate = this.onClickAddDate.bind(this);
    this.removeDates = this.removeDates.bind(this);
    this.editDates = this.editDates.bind(this);
    this.onMoveDates = this.onMoveDates.bind(this);

    let datetimePickDates = {
      startDate: new Date(),
      endDate: new Date()
    };
    this.state = {
      name: '',
      date: [],
      dateValues: [],
      datetimePickDates: datetimePickDates,
      listNumbers: 0,
      currentNumber: 0
    };
  }


  handleChangeName(event) { this.setState({ name: event.target.value }); }
  handleChangePhone(event) { this.setState({ phone: event.target.value }); }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name + this.state.phone);
    event.preventDefault();
  }
  changeMode(mode) {
    this.setState({
      ...this.state,
      mode: mode
    });
  }
  onMoveDates(itemId, dragTime, newGroupOrder) {
    console.log("move")
    console.debug(arguments)
    let date = this.state.date[itemId];
    let diff = date.end_time - date.start_time;
    date.start_time = dragTime;
    date.end_time = dragTime + diff;
    let dates = this.state.date.slice();
    dates[itemId] = date;
    this.setState({ ...this.state, date: dates })
  }

  onClickAddDate(id, bounds) {
    if (!(bounds &&
      bounds.startDate &&
      bounds.endDate &&
      bounds.startDate.getTime() < bounds.endDate.getTime())) {
      alert("Uncorrect dates");
      return;
    }
    let data =
    {
      id: id,
      group: 1,
      start_time: bounds.startDate,
      end_time: bounds.endDate
    };
    let dates = this.state.date.slice();
    dates[id] = data;
    let datetimePickDates = {
      startDate: bounds.endDate
    };
    this.setState({
      ...this.state,
      date: dates,
      datetimePickDates: datetimePickDates,
      listNumbers: dates.length,
      currentNumber: dates.length
    })
  }
  editDates(id) {
    let datetimePickDates = {
      startDate: this.state.date[id].start_time,
      endDate: this.state.date[id].end_time,
    };
    this.setState({
      ...this.state,
      currentNumber: id,
      datetimePickDates: datetimePickDates
    })
  }

  removeDates(id) {
    let dates = this.state.date;
    dates.splice(id);
    this.setState({
      ...this.state,
      date: dates,
    })
  }
  render() {
    console.log("render");
    console.debug(this.state);

    const groups = [
      { id: 1, title: 'group 1', height: 100, canMove: true },
      { id: 2, title: 'group 2' }
    ]
    let dates = this.state.date;
    let options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: 'numeric',
      minute: 'numeric',
    };
    return (
      <form onSubmit={this.handleSubmit} >
        <div>
          <NameForm handleChange={this.handleChangeName} text={"Name"} />
          <NameForm handleChange={this.handleChangePhone} text={"Phone"} />
          <input type="submit" value="Submit" />
        </div>


        <InputDateContainer onClickAddDate={this.onClickAddDate}
          removeDates={this.removeDates}
          startDate={this.state.datetimePickDates.startDate}
          endDate={this.state.datetimePickDates.endDate}
          number={this.state.currentNumber} />
        <Timeline groups={groups}
          items={this.state.date}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
          onItemMove={this.onMoveDates}
        />
        <ol>
          {dates && dates.map((d, i) => {
            let startDate = Intl.DateTimeFormat("en-GB", options).format(d.start_time);
            let endDate = Intl.DateTimeFormat("en-GB", options).format(d.end_time);
            return (<li key={d.id}><span>{startDate + " - " + endDate}</span>
              <input type="button" value={"edit"} onClick={() => this.editDates(d.id)} />
              <input type="button" value={"remove"} onClick={() => this.removeDates(d.id, this.state)} /></li>);
          })}
        </ol>
      </form>
    );
  }
}