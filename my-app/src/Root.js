import React from "react";

import {Header} from "./components/Header";

 class Root extends React.Component {
    render() {
        return (
            <div className="container-fluid" style={{padding:0}}>
                <div className="row">
                   
                        <Header />
                    
                </div>
                <div className="row">
                    
                        {this.props.children}
                    
                </div>
            </div>
        );
    }
}

export default Root;