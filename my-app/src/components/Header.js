import React from "react";
import {Link} from "react-router-dom";
import '../exStyle.css';

export const Header = (props) => {
    return (
      <div className="container-fluid">
        <nav style={{marginBottom:50}} className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <ul className="nav navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to={"/admin/category"} >Category</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/admin/product"}>Create product</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/admin/shelf"}>Shelf</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/admin/color"}>Color</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/admin/size"}>Size</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/admin/products"}>Products</Link>
      </li>
    </ul>
  </div>
</nav>
</div>

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