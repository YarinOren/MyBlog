import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            resp: null,
            redirect: false,
        };
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    handleLogin = (e) => {

        const url = "/login";
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(url, data)
            .then((res) => {
                this.setState({
                    username: '',
                    password: '',
                    resp: 'Success: user logged-in',
                });
                this.setState({redirect: true});
                this.props.onLoginSuccess()
                this.props.changeNameAndIdOnLoginSuccess(res.data)
            })
            .catch((err) => {
                this.setState({
                    resp: "Error: failed to login user."
                });
            });
    }

    render() {
        console.log(this.state.redirect)
        if (this.state.redirect) {
            console.log("im here" + this.state.redirect)
            return <Redirect to={this.state.redirect} />
        }
        return (
            <center>
            <div>
                <br></br>
                <br></br>
                <h1 style={{color:"#483D8B"}}>Login</h1>
                <br></br>
                <TextField 
                    required id="outlined-user-name" 
                    label="User name" 
                    type="user name" 
                    variant="outlined" 
                    onChange={this.handleUsernameChange}
                    />
                <br></br>
                <br></br>
                <TextField
                    required
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={this.handlePasswordChange}
                />
                <br></br>
                <br></br>
                <Button variant="contained" onClick={this.handleLogin}>Login</Button>
                <br></br>
                <br></br>
                <Link to="/login">Forgot Username / Password</Link>
                <br></br>
                <div>{this.state.resp ? this.state.resp : null}</div>
            </div>
        </center>
        );
    }
}

export default Login;