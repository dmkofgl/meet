import React from 'react';

export class NameForm extends React.Component {
    render() {
        return (
            <div>
                <label> {this.props.text}: </label>
                <input type="text" value={this.props.value} onChange={(e) => this.props.handleChange(e)} />
            </div>
        );
    }
}