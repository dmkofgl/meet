import React from 'react';

export class ModeButton extends React.Component {
    render() {
        return (
                <input type="button" value={this.props.text} onClick={()=> this.props.onClick(this.props.value)}/>
        );
    }
}