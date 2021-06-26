import React from 'react';
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class PostUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: undefined,
            content: undefined,
            redirect: false,
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get(`/posts/${id}`).then(res => {
            this.setState({
                title: res.data.title,
                content: res.data.content,
            });
        })
    }

    titleOnChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }

    contentOnChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
        }

        let id = this.props.match.params.id;
        axios.post(`/post/update/${id}`, data).then(res => {
            const post = res.data;
            this.setState({title: undefined,
                            content: undefined,
                            redirect: true});
        })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (
        <div>
            <center>
                <br></br>
                <br></br>
                {/*id={this.state.post.id}*/}
                <h4>Title</h4>
                <TextField
                                rows={8}
                                variant="outlined"
                                onChange={this.titleOnChange}
                                value={this.state.title}
                                name="title"
                                style={{width: 600, marginTop: '10px'}}
                            />
                <h4>Content</h4>
                <TextField
                                multiline
                                rows={8}
                                variant="outlined"
                                onChange={this.contentOnChange}
                                value={this.state.content}
                                name="content"
                                style={{width: 600, marginTop: '10px'}}
                            />
                {/*image={this.state.post.image}*/}
                {/*published={this.state.post.published}*/}
                {/*author={this.state.post.author}*/}
                <br></br>
                <br></br>
                <button type="submit" onClick={this.handleSubmit}>Save post</button>
            </center>
        </div>
        );
    }
}

export default PostUpdate;