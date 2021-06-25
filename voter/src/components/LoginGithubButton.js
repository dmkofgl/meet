import React from 'react';

export class LoginGithubButton extends React.Component {
    render() {
        return (
                <input type="button" value="Login github" onClick={()=> this.props.onClick()}/>
        );
    }
}