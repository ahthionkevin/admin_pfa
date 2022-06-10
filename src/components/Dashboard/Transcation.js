import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
};

const Transcation = ({ product }) => {
    const [poster, setPoster] = useState({});

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8080/api/user/${post.userId}`)
    //         .then((res) => setPoster(res.data));
    // }, []);
    return (
        <>
            <tr className="widgetLgTr">
                <td className="widgetLgUser">
                    {product.img === null ? (
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {product.name}
                        </Avatar>
                    ) : (
                        <img src={product.img} alt="" className="widgetLgImg" />
                    )}

                    <span className="widgetLgName">{product.title}</span>
                </td>
                <td className="widgetLgDate">{product.categories[0]}</td>
                <td className="widgetLgAmount">{product.price} DH</td>
                <td className="widgetLgAmount">
                    {product.isComposite ? "compose" : "simple"}
                </td>
            </tr>
        </>
    );
};

export default Transcation;
