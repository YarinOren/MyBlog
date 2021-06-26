import React from 'react';
import axios from 'axios';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: undefined,
            content: undefined,
            author: props.isLoggedIn ? props.username : "Anonymous",
        };
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }
    
    handleContentChange = (e) => {
        this.setState({
            content: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author,
        }

        axios.post('/posts', data).then(res => {
            const post = res.data;
            this.setState({title: '',
                                 content: '',
                                 author:''});
        })
    }

    render() {
        return (
            <div>
                <center>
                    <h1>Create new post</h1>
                    <p>
                        <form>
                            <label>Post Title:   </label>
                            <input type="text" size="40" value={this.state.title} onChange={this.handleTitleChange}></input>
                            <br/><br/>
                            <textarea rows="8" cols="60" placeholder="Enter post content here..." value={this.state.content} onChange={this.handleContentChange}></textarea>
                            <br></br>
                            <br></br>
                            <button type="submit" onClick={this.handleSubmit}>Create post</button>
                        </form>
                    </p>
                </center>
            </div>
        );
    }
}

export default NewPost;