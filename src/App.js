import React, {Component} from 'react';
import './css/App.css';
import Header from "./components/header/Header";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import MainPage from "./components/layout/mainPage/MainPage";
import ProductMapper from "./components/product/ProductMapper";
import SingleProduct from "./components/layout/singleProduct/SingleProduct"
import ShoppingCart from "./components/header/ShoppingCart";
import Checkout from "./components/layout/checkout/Checkout";
import {isUserLoggedIn} from "./service/fetchService/fetchService";
import {connect} from "react-redux";

class App extends Component {

    componentWillMount() {
        isUserLoggedIn()
            .then(resp => {
                if (resp.email === '') {
                    this.props.setUserEmail('');
                    this.props.setLoggedIn(false);
                    this.props.setBillingAddressList('');
                    this.props.clearShoppingCart();
                    this.props.setSubtotal(0);
                }
            })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <br/>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route path="/about" component={ProductMapper}/>
                        <Route path="/products/:id" component={SingleProduct}/>
                        <Route path="/cart" component={ShoppingCart}/>
                        <Route path="/checkout" component={Checkout}/>
                        {/*<Route path="/products/:type" component={}/>*/}
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserEmail: function (email) {
            const action = {type: "setUserEmail", email};
            dispatch(action);
        },
        setLoggedIn: function (boolean) {
            const action = {type: "setLoggedIn", boolean};
            dispatch(action);
        },
        setBillingAddressList: function (billingAddressList) {
            const action = {type: "setBillingAddressList", billingAddressList};
            dispatch(action);
        },
        clearShoppingCart: function () {
            const action = {type: "clearShoppingCart"};
            dispatch(action);
        },
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
    }
};

export default connect(null, mapDispatchToProps)(App);
