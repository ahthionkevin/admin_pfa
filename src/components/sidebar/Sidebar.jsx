import React from 'react';
import "./Sidebar.css"
import {LineStyle,PersonOutline, PostAddOutlined} from "@material-ui/icons"
import { ArticleOutlined, PhotoCameraBackOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <NavLink to="/" className="sidebarLink" style={{color:'GrayText',textDecoration:'none'}} >
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />Home
                            </li>
                        </NavLink>  
                        <NavLink to="/users" className="sidebarLink" style={{color:'GrayText',textDecoration:'none'}}>   
                            <li className="sidebarListItem">
                                 <PersonOutline/>Users
                            </li>
                        </NavLink>
                        <NavLink to="/posts" className="sidebarLink" style={{color:'GrayText',textDecoration:'none'}}> 
                            <li className="sidebarListItem">
                                <PhotoCameraBackOutlined/>Posts
                            </li>
                        </NavLink>
                        <NavLink to="/articles" className="sidebarLink" style={{color:'GrayText',textDecoration:'none'}}> 
                            <li className="sidebarListItem">
                                <ArticleOutlined/>Articles 
                            </li>
                        </NavLink>
                        <NavLink to="/newArticle" className="sidebarLink" style={{color:'GrayText',textDecoration:'none'}}>
                            <li className="sidebarListItem">
                                <PostAddOutlined/>New Article
                            </li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;