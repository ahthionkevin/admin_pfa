import { IconButton } from "@material-ui/core";
import { Delete, Done } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Dashboard/Post";
import "./PostList.css";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const handleDelete = (id) => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${
        //             JSON.parse(sessionStorage.getItem("token")).token
        //         }`,
        //     },
        // };
        axios.delete("http://localhost:9000/api/products/" + id);
        setPosts(posts.filter((item) => item._id !== id));
    };

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/products/")
            .then((res) => setPosts(res.data));
    }, []);

    return (
        <div className="postList">
            <h1>List of Products</h1>
            <div className="postContainer">
                {posts.map((post) => (
                    <div className="post-postContainer" key={post._id}>
                        <Post post={post} />
                        <div className="button-postContainer">
                            <IconButton aria-label="add to favorites">
                                <Link to={`/products/${post._id}`}>
                                    <Done />
                                </Link>
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

export default PostList;
