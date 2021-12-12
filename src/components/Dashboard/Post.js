import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = (props) => {
    const [user, setUser] = useState({});

    const { post } = props;

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/user/${post.userId}`)
            .then((res) => setUser(res.data));
    }, []);

    return (
        <Card
            sx={{ maxWidth: 345, marginBottom: 3 }}
            style={{ width: "350px", minHeight: "350px" }}
        >
            <CardHeader
                avatar={
                    user.picture === null ? (
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {user.firstName[0]}
                        </Avatar>
                    ) : (
                        <img src={user.picture} alt="" className="userImg" />
                    )
                }
                title={user.firstName + " " + user.lastName}
                subheader={post.publicationDate}
            />
            {post.picture && (
                <CardMedia component="img" height="194" image={post.picture} />
            )}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Post;
