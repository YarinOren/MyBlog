import React from "react";

const Comments = ({comments}) => {
    return (
    <div className="comments">
        <h4 className="comments">Comments</h4>
            {comments.map(comment => {
                return (
                    <li>{comment.content}</li>
                );
            })}
    </div>
    );
};

export default Comments;