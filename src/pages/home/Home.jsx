import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/widgetLg';
import WidgetSm from '../../components/widgetSm/widgetSm';
import "./Home.css"




const Home = () => {

    const [users,setUsers]=useState([]);
    const [lastUsers,setLastUsers]=useState([]);
    const [lastProducts,setLastProducts]=useState([]);
    const [products,setProducts]=useState([]);
    const [events,setEvents]=useState([]);

    useEffect( () => {
         axios
            .get("http://localhost:9000/api/products/")
            .then((res) => {
                setProducts(res.data);
                setLastProducts(res.data.slice(-5));
            });

         axios.get(`http://localhost:9000/api/users/`).then((res) => {
            setUsers(res.data);
            setLastUsers(res.data.slice(-5));
        });

         axios
            .get("http://localhost:9000/api/events/")
            .then((res) => setEvents(res.data));

    }, [])
    return (
        <div className="home">
            <FeaturedInfo info={{
                "users":users.length,
                "products":products.length,
                "events":events.length,
            }}
        />
            <div className="homeWidgets">
                <WidgetSm lastUsers={lastUsers}/>
                <WidgetLg lastProducts={lastProducts}/>
            </div>
        </div>
    );
};

export default Home;