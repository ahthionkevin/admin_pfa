import { Avatar } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { red } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewArticle.css";

const NewEvent = () => {
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
        setRelatedProducts(
            relatedProducts.filter((item) => {
                // if (item._id !== id)
                //     setNotRelatedProducts([...notRelatedProducts, item]);
                return item._id !== id;
            })
        );
        console.log(id);
    };

    const handleDelete2 = (item) => {
        console.log(item);
        setRelatedProducts([...relatedProducts, item]);
        console.log(id);
    };

    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [notRelatedProducts, setNotRelatedProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [msg, setMsg] = useState("");
    const [type, setType] = useState("PROMO");
    const [reduction, setreduction] = useState(0);

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
                        {params.row.img ? (
                            <img
                                className="userListImg"
                                src={params.row.img}
                                alt=""
                            />
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
                return `${params.row.price}` + "DH";
            },
        },
        {
            field: "isComposite",
            headerName: "Type",
            width: 120,
            renderCell: (params) => {
                return params.row.isComposite ? "Compose" : "Simple";
            },
        },
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

    const columns2 = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.img ? (
                            <img
                                className="userListImg"
                                src={params.row.img}
                                alt=""
                            />
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
                return `${params.row.price}` + "DH";
            },
        },
        {
            field: "isComposite",
            headerName: "Type",
            width: 120,
            renderCell: (params) => {
                return params.row.isComposite ? "Compose" : "Simple";
            },
        },
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
                            onClick={() => handleDelete2(params.row)}
                        />
                    </>
                );
            },
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (relatedProducts.length < 0 || !startDate || !endDate) {
            setError(true);
        } else {
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${
            //             JSON.parse(sessionStorage.getItem("token")).token
            //         }`,
            //     },
            // // };

            // axios
            //     .post("http://localhost:9000/api/events", {
            //         name: name,
            //         startDate: startDate,
            //         endDate: endDate,
            //         products: relatedProducts.map((product) => product._id),
            //         type: type,
            //         reduction: type === "SALE" ? reduction : 0,
            //         msg: msg,
            //     })
            //     .then(() => {
            //         document.querySelector("input[type=text]").value = "";
            //         // document.querySelector("textarea").value = "";
            //         setName("");
            //         setStartDate(new Date().toLocaleDateString());
            //         setEndDate(new Date().toLocaleDateString());
            //         setError(false);
            //         navigate("/events");
            //     });

            Promise.all(
                relatedProducts.map((p) => {
                    const product = p;
                    const _id = product._id;
                    delete product._id;
                    delete product.createdAt;
                    delete product.updatedAt;
                    delete product.__v;
                    axios
                        .put(`http://localhost:9000/api/products/${_id}`, {
                            ...product,
                            reducePrice:
                                product.price -
                                (product.price * reduction) / 100,
                        })
                        .then((r) => product._id)
                        .catch((e) => {
                            setError(true);
                            console.log(e);
                        });
                    return _id;
                })
            ).then((res) => {
                axios
                    .post(
                        "http://localhost:9000/api/events/",
                        {
                            name: name,
                            startDate: startDate,
                            endDate: endDate,
                            // products: relatedProducts.map((product) => product._id),
                            products: res,
                            type: type,
                            reduction: type === "SALE" ? reduction : 0,
                            msg: msg,
                        }
                        // config
                    )
                    .then(() => {
                        document.querySelector("input[type=text]").value = "";
                        // document.querySelector("textarea").value = "";
                        setName("");
                        setStartDate(new Date().toLocaleDateString());
                        setEndDate(new Date().toLocaleDateString());
                        setError(false);
                        navigate("/events");
                    })
                    .catch((e) => {
                        console.log(e);
                        setError(true);
                    });
            });
        }
    };

    // useEffect(async () => {
    //     await fetch(picture)
    //         .then((res) => {
    //             if (res.status === 404) setIsPicture(false);
    //             else setIsPicture(true);
    //         })
    //         .catch(() => setIsPicture(false));
    // }, [picture]);

    // useEffect(() => {
    //     axios.get("http://localhost:9000/api/products").then((res) => {
    //         const ids = relatedProducts.map((item) => item._id);
    //         setNotRelatedProducts(
    //             res.data.filter((item) => !ids.includes(item._id))
    //         );
    //     });
    // }, []);

    // useEffect(() => {
    //     axios.get("http://localhost:9000/api/products").then((res) => {
    //         const ids = relatedProducts.map((item) => item._id);
    //         setNotRelatedProducts(
    //             res.data.filter((item) => !ids.includes(item._id))
    //         );
    //     });
    // }, [relatedProducts]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/products").then((res) => {
            const ids = relatedProducts.map((item) => item._id);
            if (type === "SALE") {
                setNotRelatedProducts(
                    res.data.filter(
                        (item) =>
                            !ids.includes(item._id) &&
                            item.expiration > startDate &&
                            item.expiration < endDate
                    )
                );
            } else if (type === "NEW") {
                setNotRelatedProducts(
                    res.data.filter(
                        (item) =>
                            !ids.includes(item._id) &&
                            item.createdAt > startDate &&
                            item.createdAt < endDate
                    )
                );
            } else {
                setNotRelatedProducts(
                    res.data.filter((item) => !ids.includes(item._id))
                );
            }
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:9000/api/products").then((res) => {
            const ids = relatedProducts.map((item) => item._id);

            if (type === "SALE") {
                setNotRelatedProducts(
                    res.data.filter(
                        (item) =>
                            !ids.includes(item._id) &&
                            item.expiration > startDate &&
                            item.expiration < endDate
                    )
                );
            } else if (type === "NEW") {
                setNotRelatedProducts(
                    res.data.filter(
                        (item) =>
                            !ids.includes(item._id) &&
                            item.createdAt > startDate &&
                            item.createdAt < endDate
                    )
                );
            } else {
                setNotRelatedProducts(
                    res.data.filter((item) => !ids.includes(item._id))
                );
            }
        });
    }, [relatedProducts, type, startDate, endDate]);

    return (
        <div className="newArticle">
            <h1>Add Event</h1>

            <form action="" onSubmit={handleSubmit}>
                <input
                    onInput={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of the Event"
                    autoComplete="off"
                    value={name}
                />
                <input
                    onInput={(e) => setStartDate(e.target.value)}
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="From"
                    autoComplete="off"
                    value={startDate.substring(0, 10)}
                />
                <input
                    onInput={(e) => setEndDate(e.target.value)}
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="To"
                    autoComplete="off"
                    value={endDate.substring(0, 10)}
                />
                <textarea
                    onInput={(e) => setMsg(e.target.value)}
                    type="text"
                    name="msg"
                    id="msg"
                    placeholder="Message"
                    autoComplete="off"
                    value={msg}
                    rows={30}
                ></textarea>
                <select onChange={(e) => setType(e.target.value)}>
                    <option value={"NEW"} selected={type === "NEW"}>
                        NEW
                    </option>
                    <option value={"PROMO"} selected={type === "PROMO"}>
                        PROMOTION
                    </option>
                    <option value={"SALE"} selected={type === "SALE"}>
                        SALES
                    </option>
                </select>
                {type === "SALE" && (
                    <>
                        <input
                            onInput={(e) => setreduction(e.target.value)}
                            type="range"
                            min={0}
                            max={100}
                            name="reduction"
                            id="reduction"
                            placeholder="Reduction Percentage"
                            autoComplete="off"
                            value={reduction}
                        />
                        <span>{reduction} %</span>
                    </>
                )}
                {error && <p>Veuillez ecrire moins de 140 caracteres</p>}
                <input type="submit" value="Update" />
                <br />
            </form>
            <div className="mb-2">
                <h1>Related product</h1>
                <DataGrid
                    rows={relatedProducts}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={3}
                    checkboxSelection
                />
            </div>
            <br />
            <br />
            <div className="mt-2">
                <h1>Other product</h1>
                <DataGrid
                    rows={notRelatedProducts}
                    disableSelectionOnClick
                    columns={columns2}
                    getRowId={(row) => row._id}
                    pageSize={8}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default NewEvent;
