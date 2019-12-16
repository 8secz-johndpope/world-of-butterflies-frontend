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
import {FormattedMessage} from "react-intl";
import {IntlProvider} from "react-intl";
import languageHU from './translations/hu.json'
import languageEN from './translations/en.json'
import languageSK from './translations/sk.json'

const messages = {
    'hu': languageHU,
    'en': languageEN,
    'sk': languageSK,
};

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
            <IntlProvider locale={this.props.preferredLanguage} messages={messages[this.props.preferredLanguage]}>
                <Router>
                    <div className="App">
                        <Header/>
                        <br/>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            {/*<Route path="/about" component={ProductMapper}/>*/}
                            <Route path="/products/:id" component={SingleProduct}/>
                            <Route path="/cart" component={ShoppingCart}/>
                            <Route path="/checkout" component={Checkout}/>
                            {/*<Route path="/products/:type" component={}/>*/}
                        </Switch>
                    </div>
                </Router>
            </IntlProvider>

        );
    }
}

function mapStateToProps(state) {
    return {
        preferredLanguage: state.preferredLanguage,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
