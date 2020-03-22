import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getShoppingCartContent} from "../../../service/fetchService/fetchService";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

//TODO unsuccesful products
class OrderComplete extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        wrappedOrderEntities: [],
        outOfQtyList: [],
        shippingAddress: {},
        billingAddress: {},
        isBillingAddressDifferent: false,
        subtotal: 0,
    };

    componentDidMount(): void {
        this.fetchShoppingCart();
    }

    fetchShoppingCart = () => {
        if (this.props.isLoggedIn) {
            getShoppingCartContent()
                .then(resp => {
                    if (resp.chosenShippingAddress.id === resp.chosenBillingAddress.id) {
                        this.setState({
                            wrappedOrderEntities: resp.wrappedOrderEntities,
                            outOfQtyList: resp.outOfQtyList,
                            shippingAddress: resp.chosenShippingAddress,
                            billingAddress: resp.chosenBillingAddress,
                            subtotal: resp.subtotal,
                            isBillingAddressDifferent: false,
                        })
                    } else {
                        this.setState({
                            wrappedOrderEntities: resp.wrappedOrderEntities,
                            outOfQtyList: resp.outOfQtyList,
                            shippingAddress: resp.chosenShippingAddress,
                            billingAddress: resp.chosenBillingAddress,
                            subtotal: resp.subtotal,
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
                        isBillingAddressDifferent: false,
                    })
                } else {
                    this.setState({
                        wrappedOrderEntities: sessionStorage.wrappedOrderEntities,
                        outOfQtyList: sessionStorage.outOfQtyList,
                        shippingAddress: sessionStorage.chosenShippingAddress,
                        billingAddress: sessionStorage.chosenBillingAddress,
                        subtotal: sessionStorage.subtotal,
                        isBillingAddressDifferent: true,
                    })
                }
            }
        }
    };

    getSessionStorage = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            console.log("not null");
            return JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY));
        } else {
            console.log(" null");
            return this.props.history.push("/cart");
        }
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


    render() {
        return (
            <div className="order-overview-container">

                <div className="status-bar-container">
                    <p className="status-bar">
                        <Link to={"/cart"}
                              style={{
                                  textDecoration: 'none',
                                  color: 'black',
                              }}>
                        <span>
                        SHOPPING CART
                        </span>
                        </Link>

                        <span className="slash-between">
                                /
                    </span>

                        <Link to={"/checkout"}
                              style={{
                                  textDecoration: 'none',
                                  color: 'black',
                              }}>
                        <span>
                        CHECKOUT DETAILS
                        </span>
                        </Link>

                        <span className="slash-between">
                                /
                    </span>
                        <Link to={"/order-complete"}
                              style={{
                                  textDecoration: 'none',
                                  color: 'black',
                              }}>
                        <span style={{
                            fontWeight: "bold",
                        }}>
                        ORDER COMPLETE
                        </span>
                        </Link>
                    </p>
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
                                        {wrappedE.product.price}
                                    </div>
                                    <div className="product-qty">
                                        {this.countQtyByIdAndFrameColour(wrappedE.product.id, wrappedE.frame.colour)}
                                    </div>
                                    <div className="product-sum">
                                        {this.calculatePricePerCategory(wrappedE.product.price, this.countQtyByIdAndFrameColour(wrappedE.product.id, wrappedE.frame.colour))}€
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="unavailable-products"></div>
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
                                    {this.state.shippingAddress.country}
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
                                            {this.state.billingAddress.country}
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

                <div className="out-of-quantity-container">
                    {this.props.outOfQtyList.length === 0 ?
                        null
                        :
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
                                            <td>{wrappedProduct.product.price}€</td>
                                            <td className="shopping-cart-fa-icons-container">
                                            <span id="element-between-fa-icons">
                                                {this.countQtyByIdAndFrameColourForOutOfStock(wrappedProduct.product.id, wrappedProduct?.frame?.colour)}
                                            </span>
                                            </td>
                                            <td>
                                                {
                                                    this.calculatePricePerCategory(wrappedProduct.product.price, this.countQtyByIdAndFrameColourForOutOfStock(wrappedProduct.product.id, wrappedProduct?.frame?.colour))
                                                }€
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </span>
                    }
                </div>

                <div className="pay-container">

                    <div className="subtotal">
                        {this.state.subtotal.toFixed(2)}€
                    </div>

                    <div className="pay-btn-container">
                        <div className="pay-btn">
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
    }
}

const invisibleFrame = process.env.REACT_APP_INVISIBLE_FRAME;
const serverURL = process.env.REACT_APP_API_URL;
export default withRouter(connect(mapStateToProps, null)(OrderComplete));