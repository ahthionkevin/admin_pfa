import React from 'react';
import Transcation from '../Dashboard/Transcation';
import "./widgetLg.css"

const widgetLg = ({lastPosts}) => {

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                <th className="widgetLgTh">User</th>
                <th className="widgetLgTh">Date</th>
                <th className="widgetLgTh">Content</th>
                </tr>
                
                {
                    lastPosts.map(post => <Transcation post={post}/>)
                }
            </table>
        </div>
    );
};

export default widgetLg;