  
import React from 'react';
import "../Styles/TopBar.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class TopBar extends React.Component {

    doLogout = () => {
        const url = "/logout";
        const user_id = {user_id: this.props.user_id}
        axios.post(url, user_id)
            .then((res) => {
                this.props.onLogout()
            })
            .catch((err) => {
                console.log("Error")
            });
    }

    render() {
        return (
            <header>
                <div className="top-bar">
                    <div>
                        <Link to="/">Home</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/about">About Me</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/contact">Contact Me</Link>
                        <span className="vertical-line"> | </span>
                        <Link to="/newpost">New Post</Link>
                    </div>
                    <div className="right-positioned">
                        {this.props.isLoggedIn?"Hello " + this.props.username
                            :
                            <Link to="/login">Login</Link>}
                        <span className="vertical-line"> | </span>
                        {this.props.isLoggedIn? <button onClick={this.doLogout}>Logout</button> : <Link to="/signup">Sign-up</Link>}
                    </div>
                </div>
            </header>
        );
    }
}

export default TopBar;