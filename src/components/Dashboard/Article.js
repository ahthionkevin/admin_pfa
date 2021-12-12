import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
import "./Post.css";

const Article = (props) => {
    const { post } = props;

    return (
        <Card
            sx={{ maxWidth: 345, marginBottom: 3 }}
            style={{ width: "350px", minHeight: "350px" }}
        >
            <CardHeader subheader={post.publicationDate} />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>

            {post.picture && (
                <CardMedia component="img" height="194" image={post.picture} />
            )}
        </Card>
    );
};

export default Article;
