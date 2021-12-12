import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
};

const Transcation = ({ post }) => {
    const [poster, setPoster] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/user/${post.userId}`)
            .then((res) => setPoster(res.data));
    }, []);
    return (
        <>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    {poster.picture === null ? (
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {poster.firstName[0]}
                        </Avatar>
                    ) : (
                        <img
                            src={poster.picture}
                            alt=""
                            className="widgetLgImg"
                        />
                    )}

                    <span className="widgetLgName">
                        {poster.lastName + " " + poster.firstName}
                    </span>
                </td>
                <td className="widgetLgDate">{post.publicationDate}</td>
                <td className="widgetLgAmount">{post.content}</td>
            </tr>
        </>
    );
};

export default Transcation;
