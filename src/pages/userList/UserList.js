import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const handleDelete = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${
                    JSON.parse(sessionStorage.getItem("token")).token
                }`,
            },
        };
        axios.delete("http://localhost:8080/api/user/delete/" + id, config);
        setUsers(users.filter((item) => item.id !== id));
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/user/")
            .then((res) => setUsers(res.data));
    }, []);
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {params.row.picture ? (
                            <img
                                className="userListImg"
                                src={params.row.picture}
                                alt=""
                            />
                        ) : (
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                                className="userListImg"
                            >
                                {params.row.firstName[0]}
                            </Avatar>
                        )}
                        {params.row.lastName + " " + params.row.firstName}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "accountType",
            headerName: "Status",
            width: 120,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">View</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <h1 className="userListTitle">List of User</h1>

            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
};

export default UserList;
