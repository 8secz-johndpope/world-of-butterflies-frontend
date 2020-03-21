import React, {Component} from 'react';
import {connect} from 'react-redux';
import {faPlusCircle, faMinusCircle, faArrowRight, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {updateShoppingCart} from "../../../service/fetchService/fetchService";
import BasicShippingLocationDropdown from "./BasicShippingLocationDropdown";

class ShoppingCart extends Component {
    subtotal = 0;

    state = {
        chosenLocation: {
            key: 'app.basic-shipping-locations.slovakia',
            value: 15
        },
        areLocationChoicesVisible: false,
        // isLocationSet: false,
        basicLocations: [
            {
                key: 'app.basic-shipping-locations.slovakia',
                value: 15
            },
            {
                key: 'app.basic-shipping-locations.europe',
                value: 20

            },
            {
                key: 'app.basic-shipping-locations.third-world',
                value: 35
            }
        ],
        outOfQtyList: [],
    };


    countQtyByIdAndFrameColour = (id, frameColour) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct.chosenFrame.colour === frameColour
        );
        return countTypes.length;
    };

    countQtyByIdAndFrameColourForOutOfStock = (id, frameColour) => {
        const countTypes = this.state.outOfQtyList.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct.frame.colour === frameColour
        );
        return countTypes.length;
    };

    countAddedProducts = (id) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id);
        return countTypes.length;
    };

    componentWillMount() {
        this.calculateSubtotal();
        this.saveShoppingCartToServer();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        this.calculateSubtotal();
        // this.saveShoppingCartToServer();
    }


    saveShoppingCartToServer = () => {
        if (this.props.isLoggedIn) {
            let entityIds = [];
            let productsInShoppingCart = [];
            let takenFrames = [];

            // eslint-disable-next-line array-callback-return
            this.props.productsInShoppingCart.filter((wrappedProduct, index) =>
                index === this.props.productsInShoppingCart.findIndex(
                elem => elem.product.id === wrappedProduct.product.id &&
                    elem.chosenFrame.colour === wrappedProduct.chosenFrame.colour
                )).map((wrappedProduct) => {

                    let productId = wrappedProduct.product.id;
                    let frameId = wrappedProduct.chosenFrame.id;
                    let qty = this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct.chosenFrame.colour);
                    entityIds.push({productId, frameId, qty})
                }
            );
            let object = {'entityIds': entityIds};
            console.log(object);

            updateShoppingCart(object)
                .then(resp => {
                    if (resp.id != null) {
                        this.setState({
                            outOfQtyList: resp.outOfQtyList,
                        });
                        console.log(resp);

                        resp.wrappedOrderEntities.map(wrappedEntity => {

                            let uniqueId = Date.now() + Math.floor(Math.random() * Math.floor(9999999));
                            let newWrappedProduct = {
                                uniqueId: uniqueId,
                                product: wrappedEntity.product,
                                chosenFrame: wrappedEntity.frame,
                            };

                            let customFrameObject = {
                                uniqueId: uniqueId,
                                frame: wrappedEntity.frame,
                            };

                            productsInShoppingCart.push(newWrappedProduct);
                            takenFrames.push(customFrameObject);
                        })
                    }
                }).then(() => {
                this.props.setShoppingCart(productsInShoppingCart);
                this.props.setFrames(takenFrames);
            });
        }
    };


    //var arr = [];
    // for(var i=1; i<=mynumber; i++) {
    //    arr.push(i.toString());
    // }

    addOneProductToShoppingCart = (product, frame) => {
        if (this.countAddedProducts(product.id) < product.availableQuantity &&
            frame.quantity > this.countTakenFrameAmount(frame.id)) {
            this.subtotal += product.price;
            let uniqueId = Date.now();
            let newWrappedProduct = {
                uniqueId: uniqueId,
                product: product,
                chosenFrame: frame,
            };
            let customFrameObject = {
                uniqueId: uniqueId,
                frame: this.props.takenFrames.filter((takenFrame) => takenFrame.frame.id === frame.id)[0].frame,
            };
            this.props.addToShoppingCart(newWrappedProduct);
            this.props.addFrame(customFrameObject);

        }
    };

    countTakenFrameAmount = (frameId) => {
        return this.props.takenFrames.filter(takenFrame => takenFrame.frame.id === frameId).length;
    };

    removeOneProductFromShoppingCart = (wrappedProduct) => {
        this.subtotal -= wrappedProduct.product.price;
        this.props.removeFromShoppingCart(wrappedProduct.uniqueId);
        this.props.removeFrame(wrappedProduct.uniqueId);


    };

    calculatePricePerCategory = (price, qty) => {
        let total = (price * qty);
        return total.toFixed(2);
    };

    calculateSubtotal = () => {
        this.calculateShippingCost();
        let total = 0;
        this.props.productsInShoppingCart.map((wrappedProduct =>
                total += wrappedProduct.product.price
        ));
        let shippingCost = this.props.shippingCost;
        this.subtotal = total + shippingCost;
        this.props.setSubtotal(this.subtotal);
    };

    calculateShippingCost = () => {
        let productWeight = 0;
        this.props.productsInShoppingCart.map((productInCart) =>
            productWeight += productInCart.product.weight
        );
        let shippingCost;
        shippingCost = productWeight * this.state.chosenLocation.value;
        this.props.updateShippingCost(shippingCost);
    };

    setLocation = (location) => {
        this.setState({
            // isLocationSet: true,
            chosenLocation: location,
            areLocationChoicesVisible: false,
        }, () => this.calculateShippingCost())

    };

    displayLocationChoices = () => {
        this.setState({
            areLocationChoicesVisible: !this.props.areLocationChoicesVisible
        })
    };

    render() {
        return (
            <React.Fragment>
                {this.props.productsInShoppingCart.length ?
                    <div className="vertical-container">
                        <p className="status-bar">
                            <Link to={"/cart"}
                                  style={{
                                      textDecoration: 'none',
                                      color: 'black',
                                  }}>
                                <span style={{
                                    fontWeight: "bold",
                                }}>
                                SHOPPING CART
                                </span>
                            </Link>

                            <span className="slash-between">
                                /
                            </span>


                            <span style={{
                                cursor: 'not-allowed'
                            }}>
                            CHECKOUT DETAILS
                            </span>

                            <span className="slash-between">
                                /
                            </span>

                            <span style={{
                                cursor: 'not-allowed'
                            }}>
                            ORDER COMPLETE
                            </span>
                        </p>

                        <div className="shopping-cart-elements-subtotal-container">
                            <div className="shopping-cart-elements-container">
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
                                    {this.props.productsInShoppingCart.filter((wrappedProduct, index) =>
                                        index === this.props.productsInShoppingCart.findIndex(
                                        elem => elem.product.id === wrappedProduct.product.id &&
                                            elem.chosenFrame.colour === wrappedProduct.chosenFrame.colour
                                        ))
                                        .map((wrappedProduct) =>

                                            <tr>
                                                <td>
                                                    <Link to={"/products/" + wrappedProduct.product.id}>
                                                        <div
                                                            className={wrappedProduct.product.isInFrame ? 'wrapped-product-in-frame frame-around-butterfly' : 'wrapped-product-not-in-frame frame-around-butterfly'}
                                                            style={{
                                                                // border: `${wrappedProduct.product.isInFrame ? 'none' : '0.3cm solid black'}`,
                                                                // borderImage: `${wrappedProduct.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedProduct.chosenFrame.colour}.png) 50 / 0.3cm stretch`}`,
                                                                borderImageSource: `${wrappedProduct.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedProduct.chosenFrame.colour}.png)`}`,
                                                                // width: `${wrappedProduct.product.isInFrame ? '100%' : `auto`}`,
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
                                                    <FontAwesomeIcon
                                                        id="fa-icon-1"
                                                        className="shopping-cart-fa-icons"
                                                        icon={faMinusCircle}
                                                        onClick={() => this.removeOneProductFromShoppingCart(wrappedProduct)}
                                                    />
                                                    <span id="element-between-fa-icons">
                                                        {this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct.chosenFrame.colour)}
                                                    </span>
                                                    <FontAwesomeIcon
                                                        id="fa-icon-2"
                                                        className="shopping-cart-fa-icons"
                                                        icon={faPlusCircle}
                                                        onClick={() => this.addOneProductToShoppingCart(wrappedProduct.product, wrappedProduct.chosenFrame)}
                                                    />
                                                </td>
                                                <td>
                                                    {
                                                        this.calculatePricePerCategory(wrappedProduct.product.price, this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct.chosenFrame.colour))
                                                    }€
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>





                                {this.state.outOfQtyList.length === 0 ?
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
                                            {this.state.outOfQtyList.filter((wrappedProduct, index) =>
                                                index === this.state.outOfQtyList.findIndex(
                                                elem => elem.product.id === wrappedProduct.product.id &&
                                                    elem.frame.colour === wrappedProduct.frame.colour
                                                ))
                                                .map((wrappedProduct) =>

                                                    <tr>
                                                        <td>
                                                            <Link to={"/products/" + wrappedProduct.product.id}>
                                                                <div
                                                                    className={wrappedProduct.product.isInFrame ? 'wrapped-product-in-frame frame-around-butterfly' : 'wrapped-product-not-in-frame frame-around-butterfly'}
                                                                    style={{
                                                                        borderImageSource: `${wrappedProduct.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedProduct.frame.colour}.png)`}`,
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
                                                            {this.countQtyByIdAndFrameColourForOutOfStock(wrappedProduct.product.id, wrappedProduct.frame.colour)}
                                                        </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                this.calculatePricePerCategory(wrappedProduct.product.price, this.countQtyByIdAndFrameColourForOutOfStock(wrappedProduct.product.id, wrappedProduct.frame.colour))
                                                            }€
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </span>
                                }
                            </div>


                            <div className="subtotal-container">
                                <h1>Cart Totals</h1>
                                <p>
                                    <FormattedMessage id="app.shopping.cart.shipping"/>
                                    {this.props.shippingCost}€
                                </p>

                                <BasicShippingLocationDropdown
                                    chosenLocation={this.state.chosenLocation}
                                    areLocationChoicesVisible={this.state.areLocationChoicesVisible}
                                    isLocationSet={this.state.isLocationSet}
                                    basicLocations={this.state.basicLocations}
                                    setLocation={this.setLocation}
                                    displayLocationChoices={this.displayLocationChoices}
                                />

                                <p>
                                    <FormattedMessage id="app.shopping.cart.sub-total"/>
                                </p>
                                <h1>{this.subtotal.toFixed(2)}€</h1>
                                <Link to="/checkout"
                                      className="action-btn-lg"
                                      style={{
                                          textDecoration: 'none',
                                      }}
                                >
                                    <FormattedMessage id="app.shopping.cart.to-checkout"/>
                                </Link>
                            </div>

                        </div>
                    </div>
                    :
                    <h1>
                        <FormattedMessage id="app.shopping.cart.empty"/>
                    </h1>
                }
            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        productsInShoppingCart: state.productsInShoppingCart,
        subtotal: state.subtotal,
        takenFrames: state.takenFrames,
        shippingCost: state.shippingCost,
        isLoggedIn: state.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToShoppingCart: function (wrappedProduct) {
            const action = {type: "addProdToShoppingC", wrappedProduct};
            dispatch(action);
        },
        removeFromShoppingCart: function (uniqueId) {
            const action = {type: "removeProdFromShoppingC", uniqueId};
            dispatch(action);
        },
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        addFrame: function (customFrame) {
            const action = {type: "addFrame", customFrame};
            dispatch(action);
        },
        removeFrame: function (customFrameId) {
            const action = {type: "removeFrame", customFrameId};
            dispatch(action);
        },
        updateShippingCost: function (newShippingCost) {
            const action = {type: "updateShippingCost", newShippingCost};
            dispatch(action);
        },
        setShoppingCart: function (productsInShoppingCart) {
            const action = {type: "setShoppingC", productsInShoppingCart};
            dispatch(action);
        },
        setFrames: function (takeFrames) {
            const action = {type: "setFrames", takeFrames};
            dispatch(action);
        },
    }
};

const serverURL = process.env.REACT_APP_API_URL;
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
