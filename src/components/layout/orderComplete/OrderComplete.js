import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getShoppingCartContent} from "../../../service/fetchService/fetchService";
import {FormattedMessage} from "react-intl";

class OrderComplete extends Component {

    state = {
        wrappedOrderEntities: [],
        outOfQtyList: []
    };

    componentDidMount(): void {
        this.fetchShoppingCart();
    }

    fetchShoppingCart = () => {
        getShoppingCartContent()
            .then(resp => {
                this.setState({
                    wrappedOrderEntities: resp.wrappedOrderEntities,
                    outOfQtyList: resp.outOfQtyList,
                })
            })
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



    render() {
        return (
            <div className="order-complete-container">

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
                                <span>
                                    <div className="product-img">
                                        <div
                                            className={wrappedE.product.isInFrame ? 'wrapped-product-in-frame frame-around-butterfly' : 'wrapped-product-not-in-frame frame-around-butterfly'}
                                            style={{
                                                borderImageSource: `${wrappedE.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedE.frame.colour}.png)`}`,
                                            }}>
                                                {
                                                    <img src={serverURL + wrappedE.product.url}
                                                         className="image-in-shopping-cart"
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

                </div>

                <div className="pay-container">

                </div>

            </div>
        );
    }
}

const invisibleFrame = process.env.REACT_APP_INVISIBLE_FRAME;
const serverURL = process.env.REACT_APP_API_URL;
export default OrderComplete;
