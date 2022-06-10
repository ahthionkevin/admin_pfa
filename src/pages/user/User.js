import { CalendarToday, MailOutline, PermIdentity } from "@material-ui/icons";
import { Avatar } from "@mui/material";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./User.css";
import { MilitaryTechOutlined } from "@mui/icons-material";

const User = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();

    const routeChange = () => {
        let path = `/users`;
        navigate(path);
    };

    const handleDelete = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(sessionStorage.getItem("token")).token
                }`,
            },
        };
        await axios.delete("http://localhost:9000/api/uses/" + id, config);
        routeChange();
    };

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/users/${id}`)
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch(() => routeChange());
    });
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">User Information</h1>
                <button
                    className="userAddButton"
                    onClick={(e) => handleDelete(id)}
                >
                    Delete
                </button>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        {user.picture === null ? (
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                                className="userShowImg"
                            >
                                {user.username[0].toUpperCase()}
                            </Avatar>
                        ) : (
                            <img
                                className="userShowImg"
                                src={user.img}
                                alt=""
                            />
                        )}
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">
                                {user.username}
                            </span>
                            {user.position && (
                                <span className="userShowUserTitle">
                                    {user.isAdmin ? "Admin" : "User"}
                                </span>
                            )}
                            {user.email && (
                                <span className="userShowUserTitle">
                                    {user.email}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.username}
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MilitaryTechOutlined className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.isAdmin ? "Admin" : "User"}
                            </span>
                        </div>
                        {/* <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.registrationYear === 0
                                    ? new Date().getFullYear()
                                    : user.registrationYear}
                            </span>
                        </div> */}
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">
                                {user.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
