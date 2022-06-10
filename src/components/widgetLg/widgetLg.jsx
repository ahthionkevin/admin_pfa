import React from 'react';
import Transcation from '../Dashboard/Transcation';
import "./widgetLg.css"

const widgetLg = ({lastProducts}) => {

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Products</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                <th className="widgetLgTh">Nom</th>
                <th className="widgetLgTh">Categorie</th>
                <th className="widgetLgTh">Prix</th>
                <th className="widgetLgTh">Type</th>
                </tr>
                
                {
                    lastProducts.map(product => <Transcation product={product}/>)
                }
            </table>
        </div>
    );
};

export default widgetLg;