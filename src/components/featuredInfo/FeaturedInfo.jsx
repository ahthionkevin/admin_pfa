import { PeopleOutline } from '@material-ui/icons';
import { ArticleOutlined, PhotoCameraBackOutlined } from '@mui/icons-material';
import React from 'react';
import "./FeaturedInfo.css"

const FeaturedInfo = ({info}) => {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Number of Users</span>
                <div className="featuredNumbersContainer">
                    <span className="featuredNumber">{info.users} Users <PeopleOutline className="featuredIcon"/></span>
                </div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Number of products</span>
                <div className="featuredNumbersContainer">
                    <span className="featuredNumber">{info.products} products <PhotoCameraBackOutlined className="featuredIcon"/></span>
                </div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Number of Events</span>
                <div className="featuredNumbersContainer">
                    <span className="featuredNumber">{info.events} events <ArticleOutlined className="featuredIcon"/></span>
                </div>
            </div>
        </div>
    );
};

export default FeaturedInfo;