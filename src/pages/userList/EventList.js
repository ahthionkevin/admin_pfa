import { Avatar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
    const [events, setEvents] = useState([]);
    const handleDelete = (id) => {
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${
        //             JSON.parse(sessionStorage.getItem("token")).token
        //         }`,
        //     },
        // };
        axios.delete("http://localhost:9000/api/events/" + id);
        setEvents(events.filter((item) => item._id !== id));
    };

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/events/")
            .then((res) => setEvents(res.data));
    }, [events]);

    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 200 },
        {
            field: "startDate",
            headerName: "From",
            width: 120,
            renderCell: (params) => {
                return new Date(params.row.startDate).toLocaleDateString(
                    "fr-FR"
                );
            },
        },
        {
            field: "endDate",
            headerName: "To",
            width: 120,
            renderCell: (params) => {
                return new Date(params.row.endDate).toLocaleDateString("fr-FR");
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/events/" + params.row._id}>
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
            <h1 className="userListTitle">List of Events</h1>

            <DataGrid
                rows={events}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
};

export default UserList;
