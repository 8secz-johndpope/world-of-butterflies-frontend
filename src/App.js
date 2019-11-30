import React, {Component} from 'react';
import './css/App.css';
import Header from "./components/header/Header";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import MainPage from "./components/layout/mainPage/MainPage";
import ProductMapper from "./components/product/ProductMapper";
import SingleProduct from "./components/layout/singleProduct/SingleProduct"

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/about" component={ProductMapper}/>
                        <Route path="/products/:id" component={SingleProduct}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
