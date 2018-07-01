import React from "react";
import {BrowserRouter as Router,Route} from "react-router-dom";

import Root from './Root';
import ShowSubCategory from './container/ShowSubCategory';
import ProductPage from './container/ProductPage';
import ProductList from './container/ProductList';
import AddShelf from './components/AddShelf';
import AddColor from './components/AddColor';
import AddSize from './components/AddSize';
import {Landing} from './components/Landing';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path={"/admin"} component={Root}/ >
                    <Route exact path="/" component={Landing} />
                    <Route path={"/admin/category"} component={ShowSubCategory} />
                    <Route path={"/admin/product/:id"} component={ProductPage} />
                    <Route path={"/admin/shelf"} component={AddShelf} />
                    <Route path={"/admin/color"} component={AddColor} />
                    <Route path={"/admin/size"} component={AddSize} />
                    <Route path={"/admin/products"} component={ProductList} />
                </div>
            </Router>
        );
    }
}
export default App;
