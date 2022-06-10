import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import { AvatarGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./UpdateArticle.css";

const UpdateProduct = () => {
    // const [picture, setPicture] = useState("");
    // const [isPicture, setIsPicture] = useState(false);
    // const [content, setContent] = useState("");

    const handleDelete = (id) => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${
        //             JSON.parse(sessionStorage.getItem("token")).token
        //         }`,
        //     },
        // };
        // axios.delete("http://localhost:9000/api/events/" + id);
        console.log(id);
        setComponents(components.filter((item) => item._id !== id));
        console.log(id);
    };

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [img, setImg] = useState("");
    const [isPicture, setIsPicture] = useState(false);
    const [isComposite, setIsComposite] = useState(false);
    const [components, setComponents] = useState([]);

    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.sources.length > 0 ? (
                            <AvatarGroup max={3}>
                                {params.row.sources.map((source) => {
                                    return source.img ? (
                                        <Avatar alt="" src={source.img} />
                                    ) : (
                                        <Avatar
                                            sx={{ bgcolor: red[500] }}
                                            aria-label="recipe"
                                            className="userListImg"
                                        >
                                            {source.title[0]}
                                        </Avatar>
                                    );
                                })}
                            </AvatarGroup>
                        ) : (
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                                className="userListImg"
                            >
                                {params.row.title[0]}
                            </Avatar>
                        )}
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "desc",
            headerName: "Description",
            width: 240,
            // renderCell: (params) => {
            //     return new Date(params.row.startDate).toLocaleDateString(
            //         "fr-FR"
            //     );
            // },
        },
        {
            field: "price",
            headerName: "Unit Price",
            width: 120,
            renderCell: (params) => {
                return (
                    `${
                        params.row.newPrice
                            ? params.row.newPrice
                            : params.row.sources[0].price
                    }` + " DH"
                );
            },
        },
        // {
        //     field: "isComposite",
        //     headerName: "Type",
        //     width: 120,
        //     renderCell: (params) => {
        //         return params.row.isComposite ? "Compose" : "Simple";
        //     },
        // },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* <Link to={"/events/" + params.row._id}>
                            <button className="userListEdit">View</button>
                        </Link> */}
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isComposite && components <= 0) {
            setError(true);
        }
        // else {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${
        //             JSON.parse(sessionStorage.getItem("token")).token
        //         }`,
        //     },
        // };
        else {
            axios
                .put(
                    "http://localhost:9000/api/products/" + id,
                    {
                        title: name,
                        desc: desc,
                        price: price,
                        categories: category,
                        isComposite: isComposite,
                        img: img,
                        components: isComposite
                            ? components.map((component) => {
                                  return {
                                      ...component,
                                      sources: component.sources.map(
                                          (source) => source._id
                                      ),
                                  };
                              })
                            : null,
                        // products: products.map((product) => product._id),
                    }
                    // config
                )
                .then(() => {
                    document.querySelector("input[type=text]").value = "";
                    // document.querySelector("textarea").value = "";
                    setName("");
                    setDesc("");
                    setPrice("");
                    setError(false);
                    setCategory([]);
                    setComponents([]);
                    navigate("/products");
                })
                .catch((e) => {
                    console.log(e);
                    setError(true);
                });
        }
    };
    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/products/find/${id}`)
            .then((res) => {
                setName(res.data.title);
                setDesc(res.data.desc);
                setPrice(res.data.price);
                setIsComposite(res.data.isComposite);
                setImg(res.data.img);
                setComponents(res.data.components);
                setCategory(res.data.categories);
                // setContent(res.data.content);
                console.log(res.data);
            });
    }, []);

    useEffect(async () => {
        await fetch(img)
            .then((res) => {
                if (res.status === 404) setIsPicture(false);
                else setIsPicture(true);
            })
            .catch(() => setIsPicture(false));
    }, [img]);

    return (
        <div className="newArticle">
            <h1>Edit Product</h1>

            <form action="" onSubmit={(e) => handleSubmit(e)}>
                {isPicture && (
                    <div className="img-container">
                        <img
                            src={img}
                            alt=""
                            style={{
                                maxWidth: "350px",
                                maxHeight: "300px",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                )}
                <input
                    onInput={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of the Event"
                    autoComplete="off"
                    value={name}
                />
                <textarea
                    rows={100}
                    onInput={(e) => setDesc(e.target.value)}
                    type="text"
                    name="desc"
                    id="desc"
                    placeholder="Description"
                    autoComplete="off"
                    value={desc}
                ></textarea>
                <input
                    onInput={(e) => setPrice(e.target.value)}
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Price"
                    autoComplete="off"
                    value={`${price}`}
                />
                <input
                    onInput={(e) => setImg(e.target.value)}
                    type="text"
                    name="img"
                    id="img"
                    placeholder="picture"
                    autoComplete="off"
                    value={img}
                />
                <select
                    onChange={(e) => {
                        if (e.target.value == 1) setIsComposite(true);
                        else setIsComposite(false);
                        console.log(e.target.value);
                    }}
                >
                    <option value={0} selected={!isComposite}>
                        Simple
                    </option>
                    <option value={1} selected={isComposite}>
                        Compose
                    </option>
                </select>
                {error && <p>Verifier vos informations</p>}
                <input type="submit" value="Update" />
                <br />
            </form>
            {isComposite && (
                <div className="mb-2">
                    <h1>Related components</h1>
                    <DataGrid
                        rows={components}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={8}
                        checkboxSelection
                    />
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
