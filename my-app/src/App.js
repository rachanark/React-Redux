import React from "react";
import {render} from "react-dom";
//import {Router, Route, IndexRoute} from "react-router";
//import browserHistory from 'history/createBrowserHistory'
import {BrowserRouter as Router,Route} from "react-router-dom";

import Root from './Root';
import ShowSubCategory from './container/ShowSubCategory';
import ProductPage from './container/ProductPage';
import AddShelf from './components/AddShelf';
import AddColor from './components/AddColor';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path={"/"} component={Root}/ >
                    <Route exact path="/" component={ShowSubCategory} />
                    <Route path={"/category"} component={ShowSubCategory} />
                    <Route path={"/product"} component={ProductPage} />
                    <Route path={"/shelf"} component={AddShelf} />
                    <Route path={"/color"} component={AddColor} />
                </div>
            </Router>
        );
    }
}
export default App;
