import '../Styles/Posts.css';
import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
  
class Posts extends React.Component {
  constructor(props) {
    super(props)
    this.state = { posts: [] };
  }

  componentDidMount() {
    axios.get('/posts').then(res => {
        this.setState({ posts: res.data, });
    })
  }
  
  render() {
    return this.state.posts.map(function (post) {
        return <Post
            id={post.id}
            title={post.title}
            content={post.content}
            // image={post.image}
            // published={post.published}
            author={post.author}
        />
    })
  }
}

function Post(props) {
  return (
    <div className="post-container">
      <div className="post">
        <label className="post-title"><Link to={`/post/${props.id}`} className="post-title"> {props.title} </Link></label>
        <p className="post-content">{props.content}</p>
        <br></br>
        {/* <img width="90" height="90" className="post-image" src={props.image}/> */}
        <label className="post-footer">Published by {props.author}</label>
      </div>
    </div>
  );
}

export default Posts;