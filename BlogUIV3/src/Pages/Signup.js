import React from 'react';
import axios from "axios";

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.setState({
            username: null,
            password: null,
            resp: null,
        })
    }

    handleUserNameChange = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    handleSignup = (e) => {
        e.preventDefault();
        const url = "/signup"
        const data = {
            username: this.state.username,
            password: this.state.password,
        }

        axios.post(url, data)
            .then((res) => {
                this.setState({
                        username: '',
                        password: '',
                        resp: "Success: user signed-up."
                });
            })
            .catch((err) => {
                this.setState({
                    resp: "Error: username is already exist, choose another one"
                });
            });
    }

    render() {
        return (
            <div> <br/><br/><br/>
                Username: <input type="text" value={this.state.username} onChange={this.handleUserNameChange}></input><br/>
                Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange}></input><br/>
                <button onClick={this.handleSignup}>Sign-up</button>
                <div>{this.state.resp ? this.state.resp : null}</div>
            </div>
        )
    }
}

export default Signup;