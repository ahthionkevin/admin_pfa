import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/widgetLg';
import WidgetSm from '../../components/widgetSm/widgetSm';
import "./Home.css"




const Home = () => {

    const [users,setUsers]=useState([]);
    const [lastUsers,setLastUsers]=useState([]);
    const [lastPosts,setLastPosts]=useState([]);
    const [posts,setPosts]=useState([]);
    const [articles,setArticles]=useState([]);

    useEffect( () => {
         axios
            .get("http://localhost:8080/api/post/")
            .then((res) => {
                setPosts(res.data);
                setLastPosts(res.data.slice(-5));
            });

         axios.get(`http://localhost:8080/api/user/`).then((res) => {
            setUsers(res.data);
            setLastUsers(res.data.slice(-5));
        });

         axios
            .get("http://localhost:8080/api/article/")
            .then((res) => setArticles(res.data));

    }, [])
    return (
        <div className="home">
            <FeaturedInfo info={{
                "users":users.length,
                "posts":posts.length,
                "articles":articles.length,
            }}
        />
            <div className="homeWidgets">
                <WidgetSm lastUsers={lastUsers}/>
                <WidgetLg lastPosts={lastPosts}/>
            </div>
        </div>
    );
};

export default Home;