import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListProductComponent from "./product/ListProductComponent";
import AddProductComponent from "./product/AddProductComponent";
import EditProductComponent from "./product/EditProductComponent";
import React from "react";

const AppRouter = () => {
    return(
        <div style={style}>
            <Router>
                    <Switch>
                        <Route path="/" exact component={ListProductComponent} />
                        <Route path="/products" component={ListProductComponent} />
                        <Route path="/add-product" component={AddProductComponent} />
                        <Route path="/edit-product" component={EditProductComponent} />
                    </Switch>
            </Router>
        </div>
    )
}

const style={
    marginTop:'20px'
}

export default AppRouter;