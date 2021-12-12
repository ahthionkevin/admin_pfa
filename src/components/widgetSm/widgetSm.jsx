import { Avatar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Visibility } from '@material-ui/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./widgetSm.css"

const WidgetSm = ({lastUsers}) => {
    const navigate=useNavigate();
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Last joined members</span>
            <ul className="widgetSmList">
                {
                    lastUsers.map(user =>{
                        return (<li className="widgetSmListItem">
                        {user.picture ? (
                            <img
                                className="userListImg"
                                src={user.picture}
                                alt="widgetSmImg"
                            />
                        ) : (
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                                className="userListImg"
                            >
                                {user.firstName[0]}
                            </Avatar>
                        )}
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.lastName + " " + user.firstName}</span>
                            <span className="widgetSmUserTitle">{user.accountType}</span>
                        </div>
                        <button className="widgetSmButton" onClick={ (e)=>navigate(`/user/${user.id}`)}>
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                        </li>)
                    })
                }
            </ul>
        </div>
    );
};

export default WidgetSm;