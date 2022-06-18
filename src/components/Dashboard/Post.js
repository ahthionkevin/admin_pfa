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
    const { post } = props;

    return (
        <Card
            sx={{ maxWidth: 345, marginBottom: 3 }}
            style={{ width: "350px", minHeight: "350px" }}
        >
            <CardHeader
                title={post.title}
                subheader={
                    "Last update on " +
                    new Date(post.updatedAt).toLocaleDateString()
                }
            />
            {post.img && (
                <CardMedia component="img" height="194" image={post.img} />
            )}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Price</b> : {post.price} DH
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Reduce Price</b> : {post.reducePrice} DH
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Categories</b> : {post.categories[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <b>Type</b> : {post.isComposite ? "compose" : "simple"}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Post;
