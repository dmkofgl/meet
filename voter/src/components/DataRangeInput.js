import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../DatePicker.css';

export class DataRangeInput extends React.Component {
    render() {
        return (
                
        <DateTimePicker
        onChange={(e)=> this.props.onChange(e)}
        value={this.props.value}
        className="z-index"
      />
        );
    }
}