import React from 'react';
import "../Styles/SideBar.css";

function Sidebar() {
    return (
        <div className="side-bar">
            <h1 className="title">Latest</h1>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1 </span><a href="">go to page</a>
                </li>
                <li>
                    <span>Blog post #2 </span><a href="">go to page</a>
                </li>
                <li>
                    <span>Blog post #3 </span><a href="">go to page</a>
                </li>
            </ul>
            <hr/>
            <h1 className="title">Popular</h1>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #3 </span><a href="">go to page</a>
                </li>
                <li>
                    <span>Blog post #1 </span><a href="">go to page</a>
                </li>
                <li>
                    <span>Blog post #2 </span><a href="">go to page</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;