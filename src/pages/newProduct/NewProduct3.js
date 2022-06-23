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

    const handleDelete1 = (id) => {
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

    const handleAddComponent = () => {
        const c = {
            _id: count,
            title: nameComponent,
            desc: descComponent,
            minRequired: min,
            maxRequired: max,
            sources: relatedProducts,
        };
        if (priceComponent) c.newPrice = priceComponent;
        setCount(count + 1);
        setComponents([...components, c]);

        setNameComponent("");
        setDescComponent("");
        setMin(0);
        setMax(1);
        setRelatedProducts([]);
    };

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
    const [reduction, setReduction] = useState(0);
    const [reducePrice, setReducePrice] = useState(0);
    const [expiration, setExpiration] = useState(
        new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
        ).toLocaleDateString()
    );
    const [count, setCount] = useState(0);
    const [img, setImg] = useState("");
    const [isPicture, setIsPicture] = useState(false);
    const [isComposite, setIsComposite] = useState(false);
    const [components, setComponents] = useState([]);

    //components state
    const [nameComponent, setNameComponent] = useState("");
    const [descComponent, setDescComponent] = useState("");
    const [priceComponent, setPriceComponent] = useState(null);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(1);

    const [notRelatedProducts, setNotRelatedProducts] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);

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
        {
            field: "minRequired",
            headerName: "Min Required",
            width: 120,
            // renderCell: (params) => {
            //     return (
            //         `${
            //             params.row.newPrice
            //                 ? params.row.newPrice
            //                 : params.row.sources[0].price
            //         }` + " DH"
            //     );
            // },
        },
        {
            field: "maxRequired",
            headerName: "Max Required",
            width: 120,
            // renderCell: (params) => {
            //     return (
            //         `${
            //             params.row.newPrice
            //                 ? params.row.newPrice
            //                 : params.row.sources[0].price
            //         }` + " DH"
            //     );
            // },
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

    const columns1 = [
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
                            onClick={() => handleDelete1(params.row._id)}
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
            const cs = components;
            axios
                .put(
                    "http://localhost:9000/api/products/" + id,
                    {
                        title: name,
                        desc: desc,
                        price: price,
                        categories: category,
                        isComposite: isComposite,
                        reduction: reduction,
                        expiration: expiration,
                        img: img,
                        components: isComposite
                            ? cs.map((component) => {
                                  delete component._id;
                                  delete component.createdAt;
                                  delete component.updatedAt;
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
        axios.get("http://localhost:9000/api/products").then((res) => {
            const ids = relatedProducts.map((item) => item._id);

            setNotRelatedProducts(
                res.data.filter((item) => !ids.includes(item._id))
            );
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:9000/api/products").then((res) => {
            const ids = relatedProducts.map((item) => item._id);

            setNotRelatedProducts(
                res.data.filter((item) => !ids.includes(item._id))
            );
        });
    }, [relatedProducts, components]);

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
            <h1>Add Product</h1>

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
                    placeholder="Nom du produit"
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
                    // onInput={(e) => {
                    //     setPrice(e.target.value);
                    //     const props = Math.floor( price - (parseFloat(reduction) * price) / 100).toFixed(2);
                    //         shouldComponentUpdate( {
                    //             nextProps= setReducePrice(props);
                    //             if (nextProps.order !== this.props.order) {
                    //               return true;
                    //             }
                    //             return false;
                    //           });
                    // }}
                    onInput={(e) => {
                        setPrice(e.target.value);
                        setReducePrice(
                            Math.floor(
                                price - (parseFloat(reduction) * price) / 100
                            )
                        );
                    }}
                    type="number"
                    step=".01" //here1
                    name="price"
                    id="price"
                    placeholder="Prix"
                    autoComplete="off"
                    value={`${price}`}
                />
                {/* <input
                    onInput={(e) => setImg(e.target.value)}
                    type="text"
                    name="img"
                    id="img"
                    placeholder="picture"
                    autoComplete="off"
                    value={img}
                /> */}
                <select
                    onInput={(e) => {
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
                <input
                    // onInput={(e) => setReducePrice(e.target.value)}
                    readOnly={true}
                    type="number"
                    name="reducePrice"
                    id="reducePrice"
                    autoComplete="off"
                    value={reducePrice}
                />
                <input
                    onInput={(e) => {
                        setReduction(e.target.value);
                        setReducePrice(
                            (
                                price -
                                (parseFloat(reduction) * price) / 100
                            ).toFixed(2)
                        );
                    }}
                    type="range"
                    min={1}
                    max={100}
                    name="reduction"
                    id="reduction"
                    placeholder="reduction"
                    autoComplete="off"
                    value={reduction}
                />
                <span style={{ color: "red" }}>-{reduction} %</span>
                {error && <p>Vérifier vos informations</p>}
                <div style={{ flex: 1 }}>
                    <input
                        style={{ width: 200 }}
                        id="img"
                        onInput={(e) => setImg(e.target.value)}
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        name="img"
                    />
                    &nbsp;&nbsp;
                    <input type="submit" value="Ajouter" />
                </div>
                <br />
            </form>
            {isComposite && (
                <div className="mb-2">
                    <div>
                        <h1>Related components</h1>
                        <DataGrid
                            rows={components}
                            disableSelectionOnClick
                            columns={columns}
                            getRowId={(row) => row._id}
                            pageSize={3}
                            checkboxSelection
                        />
                    </div>
                    <div style={{ height: "200px" }}></div>
                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            onInput={(e) => setNameComponent(e.target.value)}
                            type="text"
                            name="nameComponent"
                            id="nameComponent"
                            placeholder="Name of component"
                            autoComplete="off"
                            value={nameComponent}
                        />
                        <textarea
                            rows={100}
                            onInput={(e) => setDescComponent(e.target.value)}
                            type="text"
                            name="descComponent"
                            id="descComponent"
                            placeholder="Description de Component"
                            autoComplete="off"
                            value={descComponent}
                        ></textarea>
                        <input
                            onInput={(e) => {
                                setPriceComponent(e.target.value);
                            }}
                            type="number"
                            name="priceComponent"
                            id="priceComponent"
                            placeholder="Price fo Component"
                            autoComplete="off"
                            value={`${priceComponent}`}
                        />
                        <input
                            onInput={(e) => setMin(e.target.value)}
                            type="number"
                            name="min"
                            min={0}
                            id="min"
                            placeholder="Min Required"
                            autoComplete="off"
                            value={min}
                        />
                        <input
                            onInput={(e) => setMax(e.target.value)}
                            type="number"
                            name="max"
                            min={1}
                            id="max"
                            placeholder="Max Required"
                            autoComplete="off"
                            value={max}
                        />
                        {error && <p>Vérifier vos informations</p>}
                        <div>
                            <button
                                type="button"
                                className="add_component"
                                onClick={handleAddComponent}
                            >
                                Add Component
                            </button>
                        </div>
                        <br />
                    </form>

                    <div className="mb-2">
                        <h1>Related products</h1>
                        <DataGrid
                            rows={relatedProducts}
                            disableSelectionOnClick
                            columns={columns1}
                            getRowId={(row) => row._id}
                            pageSize={3}
                            checkboxSelection
                        />
                    </div>
                    <br />
                    <br />
                    <div className="mt-2">
                        <h1>Other products</h1>
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
            )}
        </div>
    );
};

export default UpdateProduct;
