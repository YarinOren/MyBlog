import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Comments from "../Components/Comments";

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
            comments: [],
            isAuthor: false,
            commentContent: undefined,
        };
    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        const p_respons = await axios.get(`/posts/${id}`)
        //.then(res => {
        //     this.setState({
        //         post: res.data,
        //         isAuthor: this.props.username == res.data.author,
        //     });
        // })

        const c_respons = await axios.get(`/post/comments/${id}`)
        // .then(res => {
        //     this.setState({
        //         comments: res.data,
        //     });
        // })

        this.setState({
            post: p_respons.data,
            isAuthor: p_respons.data.author == this.props.username,
            comments: c_respons.data,
        })
    }

    handleContentChange = (e) => {
        this.setState({
            commentContent: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            content: this.state.commentContent,
        }

        let id = this.props.match.params.id;
        axios.post(`/post/comments/${id}`, data).then(res => {
            const post = res.data;
            this.setState({content: ''});
        })
    }

    render() {
        return (
        <div>
            <center>
                <br></br>
                <br></br>
                {/*id={this.state.post.id}*/}
                <h1>{this.state.post.title}</h1>
                <p>{this.state.post.content}</p>
                {/*image={this.state.post.image}*/}
                {/*published={this.state.post.published}*/}
                {/*author={this.state.post.author}*/}
                <br></br>
                {this.state.isAuthor
                        ?
                        <label><Link to={`/post/update/${this.props.match.params.id}`}> Edit post </Link>&nbsp; &nbsp;
                        <Link to={`/post/delete/${this.props.match.params.id}`}> Delete post </Link></label>
                        :
                        null
                }
                {this.state.comments ? <Comments comments={this.state.comments}/> : null}
                <h4>Add new comment</h4>
                    <p>
                        <form>
                            <textarea rows="8" cols="60" placeholder="Enter comment content here..." value={this.state.content} onChange={this.handleContentChange}></textarea>
                            <br></br>
                            <br></br>
                            <button type="submit" onClick={this.handleSubmit}>Add comment</button>
                        </form>
                    </p>
            </center>
        </div>
        );
    }
}

export default Post;