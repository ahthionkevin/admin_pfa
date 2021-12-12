import { IconButton } from "@material-ui/core";
import { Delete, Done } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../../components/Dashboard/Post";
import "./PostList.css";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const handleDelete = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(sessionStorage.getItem("token")).token
                }`,
            },
        };
        axios.delete("http://localhost:8080/api/post/delete/" + id, config);
        setPosts(posts.filter((item) => item.id !== id));
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/post/")
            .then((res) => setPosts(res.data));
    }, []);

    return (
        <div className="postList">
            <h1>List of Posts</h1>
            <div className="postContainer">
                {posts.map((post) => (
                    <div className="post-postContainer" key={post.id}>
                        <Post post={post} />
                        <div className="button-postContainer">
                            <IconButton aria-label="add to favorites">
                                <Done />
                            </IconButton>
                            <IconButton
                                aria-label="share"
                                onClick={(e) => handleDelete(post.id)}
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

export default PostList;
