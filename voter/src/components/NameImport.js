import React from 'react';

export class NameForm extends React.Component {
    render() {
        return (
            <div>
                <label>
                    Name:
          <input type="text" value={this.props.value} onChange={(e) => this.props.handleChange(e)} />        </label>
                <input type="submit" value="Submit" />
            </div>
        );
    }
}