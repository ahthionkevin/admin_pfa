import React from "react";
import "./TopBar.css";
import { LogoutOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import { IconButton } from "@material-ui/core";

const TopBar = ({ setToken }) => {
    const handleLogout = () => {
        setToken("");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("admin");
    };
    return (
        <div className="topbar">
            <div className="topbar-wrapper">
                <div className="top-left">
                    <img
                        src="./assets/logo.jpeg"
                        alt="logo"
                        style={{ height: "60px", width: "120px" }}
                    />
                    <span className="logo">U-Connect</span>
                </div>
                <div className="top-right">
                    <div
                        className="topbar-icons-container"
                        onClick={(e) => handleLogout()}
                    >
                        <IconButton style={{ padding: 0 }}>
                            <LogoutOutlined />
                        </IconButton>
                    </div>
                    <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        className="topAvatar"
                    >
                        {sessionStorage.getItem("admin")[0].toLocaleUpperCase()}
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
