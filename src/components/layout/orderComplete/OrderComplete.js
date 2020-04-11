import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getShoppingCartContent, buyAsUser, buyAsGuest} from "../../../service/fetchService/fetchService";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'
import StatusBar from "../../shared/statusBar/StatusBar";
import SuccessfulPurchasePopUp from "../../shared/successfulPurchasePopUp/SuccessfulPurchasePopUp";
import ProductAddedPopUp from "../../shared/productAddedPopUp/ProductAddedPopUp";

//TODO unsuccesful products
class OrderComplete extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        email: '',
        wrappedOrderEntities: [],
        outOfQtyList: [],
        shippingAddress: {
            id: 3,
            nickName: "",
            firstName: "",
            lastName: "",
            company: "",
            addressLineOne: "",
            city: "",
            state: "",
            zipCode: "",
            country: {
                id: 0,
                name: "",
                location: ""
            },
            phoneNumber: "",
            ico: "",
            dic: "",
        },
        billingAddress: {
            id: 3,
            nickName: "",
            firstName: "",
            lastName: "",
            company: "",
            addressLineOne: "",
            city: "",
            state: "",
            zipCode: "",
            country: {
                id: 0,
                name: "",
                location: ""
            },
            phoneNumber: "",
            ico: "",
            dic: "",
        },
        isBillingAddressDifferent: false,
        isSuccessPopUpVisible: false,
        subtotal: 0,
        paymentMethod: {},
        shippingMethod: {}

    };

    componentDidMount(): void {
        this.fetchShoppingCart();
    }

    fetchShoppingCart = () => {
        if (this.props.isLoggedIn) {
            getShoppingCartContent()
                .then(resp => {
                    console.log(resp);
                    if (resp.chosenShippingAddress === null || resp.chosenBillingAddress === null) {
                        this.redirectBackIfSomethingIsMissing("/checkout");
                    }
                    if (resp.paymentMethod === null || resp.shippingMethod === null) {
                        this.redirectBackIfSomethingIsMissing("/shipping-and-payment-methods");
                        return;
                    }
                    if (resp.chosenShippingAddress.id === resp.chosenBillingAddress.id) {
                        this.setState({
                            wrappedOrderEntities: resp.wrappedOrderEntities,
                            outOfQtyList: resp.outOfQtyList,
                            shippingAddress: resp.chosenShippingAddress,
                            billingAddress: resp.chosenBillingAddress,
                            subtotal: resp.subtotal,
                            paymentMethod: resp.paymentMethod,
                            shippingMethod: resp.shippingCost,
                            isBillingAddressDifferent: false,
                        });
                    } else {
                        this.setState({
                            wrappedOrderEntities: resp.wrappedOrderEntities,
                            outOfQtyList: resp.outOfQtyList,
                            shippingAddress: resp.chosenShippingAddress,
                            billingAddress: resp.chosenBillingAddress,
                            subtotal: resp.subtotal,
                            paymentMethod: resp.paymentMethod,
                            shippingMethod: resp.shippingCost,
                            isBillingAddressDifferent: true,
                        })
                    }
                })
        } else {
            let sessionStorage = this.getSessionStorage();
            if (sessionStorage != null) {
                if (sessionStorage.chosenShippingAddress.id === sessionStorage.chosenBillingAddress.id) {
                    this.setState({
                        wrappedOrderEntities: sessionStorage.wrappedOrderEntities,
                        outOfQtyList: sessionStorage.outOfQtyList,
                        shippingAddress: sessionStorage.chosenShippingAddress,
                        billingAddress: sessionStorage.chosenBillingAddress,
                        subtotal: sessionStorage.subtotal,
                        paymentMethod: sessionStorage.paymentMethod,
                        shippingMethod: sessionStorage.shippingCost,
                        email: sessionStorage.chosenShippingAddress.email,
                        isBillingAddressDifferent: false,
                    })
                } else {
                    this.setState({
                        wrappedOrderEntities: sessionStorage.wrappedOrderEntities,
                        outOfQtyList: sessionStorage.outOfQtyList,
                        shippingAddress: sessionStorage.chosenShippingAddress,
                        billingAddress: sessionStorage.chosenBillingAddress,
                        subtotal: sessionStorage.subtotal,
                        paymentMethod: sessionStorage.paymentMethod,
                        shippingMethod: sessionStorage.shippingCost,
                        email: sessionStorage.chosenShippingAddress.email,
                        isBillingAddressDifferent: true,
                    })
                }
            }
        }
    };

    getSessionStorage = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            return JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY));
        } else {
            return this.props.history.push("/cart");
        }
    };

    redirectBackIfSomethingIsMissing = (path) => {
        this.props.history.push(path)
    };

    getIdFromSessionStorage = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            let sessionStorage = JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY));
            return sessionStorage.id !== null ? sessionStorage.id : null;
        }
        return null;

    };

    countQtyByIdAndFrameColour = (id, frameColour) => {
        const countTypes = this.state.wrappedOrderEntities.filter(
            wrappedEntity => wrappedEntity.product.id === id &&
                wrappedEntity.frame.colour === frameColour
        );
        return countTypes.length;
    };

    calculatePricePerCategory = (price, qty) => {
        let total = (price * qty);
        return total.toFixed(2);
    };

    countQtyByIdAndFrameColourForOutOfStock = (id, frameColour) => {
        const countTypes = this.props.outOfQtyList.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct?.frame?.colour === frameColour
        );
        return countTypes.length;
    };

    sendPayRequest = () => {
        if (this.props.isLoggedIn) {
            buyAsUser()
        } else {
            buyAsGuest(this.getIdFromSessionStorage())
        }
        this.openPopUp();
    };

    closePopUp = () => {
        // document.body.style.overflow = 'auto';
        this.setState({
            isSuccessPopUpVisible: false
        });
        this.clearLocalstorage();
        this.clearSessionStorage();
        this.props.history.push('/')
    };

    openPopUp = () => {
        // document.body.style.overflow = 'hidden';
        this.setState({
            isSuccessPopUpVisible: true,
        })
    };

    clearLocalstorage = () => {
        this.props.clearShoppingCart();
        this.props.clearTakenFramesList();
        this.props.setSubtotal(0);
        this.props.setShippingCost(0);
        this.props.setPaymentCost(0);
        this.props.setChosenShippingAddress("");
        this.props.setChosenBillingAddress("");
    };


    clearSessionStorage = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            window.sessionStorage.removeItem(process.env.REACT_APP_SESSION_STORAGE_KEY)
        }
    };


    render() {
        return (
            <div className="order-overview-container">
                {this.state.isSuccessPopUpVisible ?
                    <SuccessfulPurchasePopUp
                        closePopUp={this.closePopUp}
                        email={this.props.isLoggedIn ? this.props.email : this.state.email}
                    />
                    :
                    null
                }

                <div className="status-bar-container">
                    <StatusBar
                        position={4}>
                    </StatusBar>
                </div>

                <div className="order-container">
                    <div className="actual-products">
                        <div className="titles">
                            <div className="title-img">

                            </div>
                            <div className="title-name">
                                <FormattedMessage id="app.shopping.cart.name"/>
                            </div>
                            <div className="title-price">
                                <FormattedMessage id="app.shopping.cart.price"/>
                            </div>
                            <div className="title-qty">
                                <FormattedMessage id="app.shopping.cart.qty"/>
                            </div>
                            <div className="title-sum">
                                <FormattedMessage id="app.shopping.cart.total"/>
                            </div>
                        </div>
                        <div className="products">
                            {this.state.wrappedOrderEntities.filter((wrappedEntity, index) =>
                                index === this.state.wrappedOrderEntities.findIndex(
                                elem => elem.product.id === wrappedEntity.product.id &&
                                    elem.frame.colour === wrappedEntity.frame.colour
                                )).map((wrappedE) =>
                                <span className="products-span">
                                    <div className="product-img">
                                        <div
                                            className={wrappedE.product.isInFrame ? 'wrapped-product-in-frame' : 'wrapped-product-not-in-frame'}
                                            style={{
                                                borderImageSource: `${wrappedE.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedE.frame.colour}.png)`}`,
                                            }}>
                                                {
                                                    <img src={serverURL + wrappedE.product.url}
                                                         className="image-in-order-overview-cart"
                                                         style={{
                                                             border: `${wrappedE.product.isInFrame ? '1px solid #D3D3D3' : 'none'}`,
                                                         }}

                                                    />
                                                }
                                        </div>
                                    </div>
                                    <div className="product-name">
                                        {wrappedE.product.name}
                                    </div>
                                    <div className="product-price">
                                        <span
                                            className="euro-sign">€</span><span>{wrappedE.product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="product-qty">
                                        {this.countQtyByIdAndFrameColour(wrappedE.product.id, wrappedE.frame.colour)}
                                    </div>
                                    <div className="product-sum">
                                        <span
                                            className="euro-sign">€</span><span>{this.calculatePricePerCategory(wrappedE.product.price, this.countQtyByIdAndFrameColour(wrappedE.product.id, wrappedE.frame.colour))}</span>
                                    </div>
                                </span>
                            )}
                        </div>
                        <div className="o-o-products-total-container">
                            <div className="empty-space"></div>
                            <div className="o-o-products-total-price">
                                <span className="euro-sign">€</span><span>{this.state.subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="address-container">
                    <div className="address-overview">
                        <h4>
                            Shipping Address
                        </h4>
                        <p>
                            {this.state.shippingAddress.nickName}
                        </p>

                        <span className="half-style-overview">
                                <p>
                                    {this.state.shippingAddress.firstName}
                                </p>
                                <p>
                                    {this.state.shippingAddress.lastName}
                                </p>
                        </span>


                        <span className="half-style-overview">
                                <p>
                                    {this.state.shippingAddress.addressLineOne}
                                </p>
                                <p>
                                    {this.state.shippingAddress.city}
                                </p>
                        </span>


                        <span className="half-style-overview">
                                <p>
                                    {this.state.shippingAddress.zipCode}
                                </p>
                                <p>
                                    {this.state.shippingAddress.country.name}
                                </p>
                        </span>

                        <p>
                            {this.state.shippingAddress.phoneNumber}
                        </p>
                        <p>
                            {this.state.shippingAddress.company}
                        </p>

                        <span className="half-style-overview">
                                <p>
                                    {this.state.shippingAddress.ico}
                                </p>
                                <p>
                                    {this.state.shippingAddress.dic}
                                </p>
                        </span>
                    </div>

                    {
                        this.state.isBillingAddressDifferent ?
                            <div className="address-overview billing-address-overview">
                                <h4>
                                    Billing Address
                                </h4>
                                <p>
                                    {this.state.billingAddress.nickName}
                                </p>

                                <span className="half-style-overview">
                                        <p>
                                            {this.state.billingAddress.firstName}
                                        </p>
                                        <p>
                                            {this.state.billingAddress.lastName}
                                        </p>
                                </span>


                                <span className="half-style-overview">
                                        <p>
                                            {this.state.billingAddress.addressLineOne}
                                        </p>
                                        <p>
                                            {this.state.billingAddress.city}
                                        </p>
                                </span>


                                <span className="half-style-overview">
                                        <p>
                                            {this.state.billingAddress.zipCode}
                                        </p>
                                        <p>
                                            {this.state.billingAddress.country.name}
                                        </p>
                                </span>

                                <p>
                                    {this.state.billingAddress.phoneNumber}
                                </p>
                                <p>
                                    {this.state.billingAddress.company}
                                </p>

                                <span className="half-style-overview">
                                        <p>
                                            {this.state.billingAddress.ico}
                                        </p>
                                        <p>
                                            {this.state.billingAddress.dic}
                                        </p>
                                </span>
                            </div>
                            :
                            null
                    }
                </div>
                <div className="border-line"></div>
                <div className="order-overview-shipping-and-payment">
                    <div className="order-o-shipping">
                        <div className="order-o-shipping-method-name">
                            {this.state.shippingMethod["name" + this.props.preferredLanguage.toUpperCase()]}
                        </div>
                        <div className="order-o-shipping-method-image">
                            <img src={serverURL + this.state.shippingMethod.imageUrl} alt="payment-method"/>
                        </div>
                        <div className="order-o-shipping-method-price">
                            <span
                                className="euro-sign">€</span><span>{this.state?.shippingMethod?.price?.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="order-o-payment">
                        <div className="order-o-payment-method-name">
                            {this.state.paymentMethod["name" + this.props.preferredLanguage.toUpperCase()]}
                        </div>
                        <div className="order-o-payment-method-image">
                            <img src={serverURL + this.state.paymentMethod.imageUrl} alt="payment-method"/>
                        </div>
                        <div className="order-o-payment-method-price">
                            <span
                                className="euro-sign">€</span><span> {this.state?.paymentMethod?.price?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {this.props.outOfQtyList.length === 0 ?
                    null
                    :
                    <div className="out-of-quantity-container">
                            <span>
                                <p>We are Sorry, but while You were browsing, these items run out of stock:</p>
                                <table className="shopping-cart-table">
                                    <thead>
                                    <tr className="shopping-cart-table-header-row">
                                        <th className="shopping-cart-table-header-row-image">
                                            <FormattedMessage id="app.shopping.cart.product"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.shopping.cart.name"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.shopping.cart.price"/>
                                        </th>
                                        <th className="shopping-cart-table-header-row-qty">
                                            <FormattedMessage id="app.shopping.cart.qty"/>
                                        </th>
                                        <th className="shopping-cart-table-header-row-total">
                                            <FormattedMessage id="app.shopping.cart.total"/>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.outOfQtyList.filter((wrappedProduct, index) =>
                                        index === this.props.outOfQtyList.findIndex(
                                        elem => elem.product.id === wrappedProduct.product.id &&
                                            elem?.frame?.colour === wrappedProduct?.frame?.colour
                                        ))
                                        .map((wrappedProduct) =>

                                            <tr>
                                                <td>
                                                    <Link to={"/products/" + wrappedProduct.product.id}>
                                                        <div
                                                            className={wrappedProduct.product.isInFrame ? 'wrapped-product-in-frame frame-around-butterfly' : 'wrapped-product-not-in-frame frame-around-butterfly'}
                                                            style={{
                                                                borderImageSource: `${wrappedProduct.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedProduct?.frame?.colour}.png)`}`,
                                                            }}>
                                                            {
                                                                <img src={serverURL + wrappedProduct.product.url}
                                                                     className="image-in-shopping-cart"
                                                                     style={{
                                                                         border: `${wrappedProduct.product.isInFrame ? '1px solid #D3D3D3' : 'none'}`,
                                                                     }}

                                                                />
                                                            }
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="shopping-cart-product-name">
                                                    <Link to={"/products/" + wrappedProduct.product.id}
                                                          style={{
                                                              textDecoration: 'none',
                                                              color: 'black',
                                                          }}>
                                                    <span>
                                                        {wrappedProduct.product.name}
                                                    </span>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <span className="euro-sign">€</span><span>{wrappedProduct?.product?.price.toFixed(2)}</span>
                                                </td>
                                                <td className="shopping-cart-fa-icons-container">
                                                <span id="element-between-fa-icons">
                                                    {this.countQtyByIdAndFrameColourForOutOfStock(wrappedProduct.product.id, wrappedProduct?.frame?.colour)}
                                                </span>
                                                </td>
                                                <td>
                                                    <span className="euro-sign">€</span><span>{this.calculatePricePerCategory(wrappedProduct.product.price, this.countQtyByIdAndFrameColourForOutOfStock(wrappedProduct.product.id, wrappedProduct?.frame?.colour))}</span>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </span>
                    </div>
                }

                <div className="pay-container">

                    <div className="subtotal">
                        <span className="euro-sign">€</span><span>{(this.state.subtotal + this.state.shippingMethod.price + this.state.paymentMethod.price).toFixed(2)}</span>
                    </div>

                    <div className="pay-btn-container">
                        <div className="pay-btn"
                             onClick={this.sendPayRequest}>
                            Pay!
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.isLoggedIn,
        outOfQtyList: state.outOfQtyList,
        preferredLanguage: state.preferredLanguage,
        email: state.email,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearShoppingCart: function () {
            const action = {type: "clearShoppingCart"};
            dispatch(action);
        },
        clearTakenFramesList: function () {
            const action = {type: "clearTakenFramesList"};
            dispatch(action);
        },
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        setChosenShippingAddress: function (chosenShippingAddress) {
            const action = {type: "setChosenShippingAddress", chosenShippingAddress};
            dispatch(action);
        },
        setChosenBillingAddress: function (chosenBillingAddress) {
            const action = {type: "setChosenBillingAddress", chosenBillingAddress};
            dispatch(action);
        },
        setShippingCost: function (newShippingCost) {
            const action = {type: "setShippingCost", newShippingCost};
            dispatch(action);
        },
        setPaymentCost: function (newShippingCost) {
            const action = {type: "setPaymentCost", newShippingCost};
            dispatch(action);
        },
    }
};

const invisibleFrame = process.env.REACT_APP_INVISIBLE_FRAME;
const serverURL = process.env.REACT_APP_API_URL;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderComplete));
