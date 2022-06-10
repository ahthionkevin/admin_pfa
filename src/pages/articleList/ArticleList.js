import { IconButton } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Delete, Edit } from "@material-ui/icons";
import Article from "../../components/Dashboard/Article";
import "./ArticleList.css";
import { NavLink } from "react-router-dom";

const ArticleList = () => {
    const [posts, setPosts] = useState([]);

    const handleDelete = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(sessionStorage.getItem("token")).token
                }`,
            },
        };
        axios.delete("http://localhost:9000/api/events" + id, config);
        setPosts(posts.filter((item) => item.id !== id));
    };

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/events")
            .then((res) => setPosts(res.data));
    }, []);

    return (
        <div className="postList">
            <h1>List of Event</h1>
            <div className="postContainer">
                {posts.map((post) => (
                    <div className="post-postContainer" key={post.id}>
                        <Article post={post} />
                        <div className="button-postContainer">
                            <IconButton aria-label="add to favorites">
                                <NavLink
                                    to={`/article/${post._id}`}
                                    style={{ color: "GrayText" }}
                                >
                                    <Edit />
                                </NavLink>
                            </IconButton>
                            <IconButton
                                aria-label="share"
                                onClick={(e) => handleDelete(post._id)}
                            >
                                <Delete />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleList;
