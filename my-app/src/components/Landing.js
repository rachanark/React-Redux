import React from "react";
import {Link} from "react-router-dom";
import '../exStyle.css';

export const Landing = (props) => {
    return (
      <div className="container-fluid" style={{marginTop: '35px', textAlign: 'center'}}>
        Welcome! For admin module, please click <Link to={"/admin/category"} >here</Link>!
</div>

    );
};  