import React from "react";
import {Link} from "react-router-dom";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="collapse navbar-collapse">
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to={"/category"} >category</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/product"}>product</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/shelf"}>shelf</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/color"}>color</Link>
      </li>
    </ul>
  </div>
</nav>

      /*  <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-">
                        <li><Link to={"/category"} >category</Link></li>
                        <li><Link to={"/product"}>product</Link></li>
                        <li><Link to={"/shelf"}>shelf</Link></li>
                        <li><Link to={"/color"}>color</Link></li>
                    </ul>
                </div>
            </div>
        </nav>*/
    );
};