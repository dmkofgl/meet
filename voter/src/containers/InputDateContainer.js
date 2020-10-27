import React, { Component } from 'react';
import { DataRangeInput } from '../components/DataRangeInput';

export class InputDateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeDataRange = this.onChangeDataRange.bind(this);
        this.state = {
            ...props,
            isWholeDay: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
          this.setState({
           ...nextProps
          });
        }
      }
    onChangeDataRange(field, value) {
        console.debug(field);
        this.setState({
            ...this.state,
            [field]: value
        })
    }
    render() {

        console.debug(this.state);
        return (
            <div>
                <DataRangeInput onChange={(e) => this.onChangeDataRange("startDate", e)} value={this.state.startDate} />
                <DataRangeInput onChange={(e) => this.onChangeDataRange("endDate", e)} value={this.state.endDate} />
                <input type="button" value={"done"} onClick={() => this.props.onClickAddDate(this.props.number, this.state)} />
            </div>
        );
    }
}