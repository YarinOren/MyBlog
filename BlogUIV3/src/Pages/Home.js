import React from 'react';
import Posts from '../Components/Posts';
import Sidebar from '../Components/SideBar';
import "../Styles/Home.css";

function Home () {
    return (
        <div className="Home">
            <div className="posts">
                <label className="title"><h1>This  is my blog</h1></label>
                <Posts/>
            </div>
            <div className="side-bar"><Sidebar/></div>
        </div>
    );
}

export default Home;