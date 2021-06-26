import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class PostDelete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.id;
        axios.post(`/post/delete/${id}`).then(res => {
            this.setState({redirect: true});
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <center>
                <button type="submit" onClick={this.handleSubmit}>Delete post</button>
            </center>
            </div>
        );
    }
}

export default PostDelete;