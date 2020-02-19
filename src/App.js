import React, {Component} from 'react';
import './css/App.css';
import Header from "./components/header/Header";
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import MainPage from "./components/layout/mainPage/MainPage";
import SingleProduct from "./components/layout/singleProduct/SingleProduct"
import ShoppingCart from "./components/header/ShoppingCart";
import Checkout from "./components/layout/checkout/Checkout";
import {isUserLoggedIn} from "./service/fetchService/fetchService";
import {connect} from "react-redux";
import {IntlProvider} from "react-intl";
import languageHU from './translations/hu.json'
import languageUS from './translations/us.json'
import languageSK from './translations/sk.json'
import Footer from "./components/footer/Footer";
import ProductMapperByMainType from "./components/layout/productsByMainType/ProductMapperByMainType";
import ProductMapperBySubType from "./components/layout/productsBySubType/ProductMapperBySubType";
import FoundProducts from "./components/layout/search/FoundProducts";
import OrderHistory from "./components/layout/orderHistory/OrderHistory";
import AdminPage from "./components/layout/adminPage/AdminPage";

const messages = {
    'hu': languageHU,
    'us': languageUS,
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
                    // this.props.clearShoppingCart();
                    // this.props.setSubtotal(0);
                }
            })
    }

    render() {
        return (
            //test comment
            <IntlProvider locale={this.props.preferredLanguage} messages={messages[this.props.preferredLanguage]}>
                <Router>
                    <div className="App">
                        <Header/>
                        <div className="whole-content-container">
                            <Switch>
                                <Route exact path="/" component={MainPage}/>
                                {/*<Route path="/about" component={ProductMapper}/>*/}
                                <Route path="/products/:id" component={SingleProduct}/>
                                <Route path="/cart" component={ShoppingCart}/>
                                <Route path="/checkout" component={Checkout}/>
                                <Route path="/main-categories/:type" component={ProductMapperByMainType}/>
                                <Route path="/sub-categories/:type" component={ProductMapperBySubType}/>
                                <Route path="/search/:queryParam" component={FoundProducts}/>
                                <Route path="/order-history" component={OrderHistory}/>
                                <Route path="/secret/admin" component={AdminPage}/>
                            </Switch>
                        </div>
                        <Footer/>
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
