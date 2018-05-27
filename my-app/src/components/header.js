import React from "react";
import {Link} from "react-router-dom";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><Link to={"/category"} >category</Link></li>
                        <li><Link to={"/product"}>product</Link></li>
                        <li><Link to={"/shelf"}>shelf</Link></li>
                        <li><Link to={"/color"}>color</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};