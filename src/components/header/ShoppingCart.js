import React, {Component} from 'react';
import {connect} from 'react-redux';
import {faPlusCircle, faMinusCircle, faArrowRight, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";


class ShoppingCart extends Component {
    subtotal = 0;


    countQtyByIdAndFrameOption = (id, frameOption) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct.frameOption === frameOption
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

    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        this.calculateSubtotal();
    }


    addOneProductToShoppingCart = (product, frame) => {
        if (this.countAddedProducts(product.id) < product.availableQuantity) {

            this.subtotal += product.price;
            let newWrappedProduct = {
                uniqueId: Date.now(),
                product: product,
                frameOption: frame,
            };
            this.props.addToShoppingCart(newWrappedProduct);
        }
    };

    removeOneProductFromShoppingCart = (wrappedProduct) => {
        this.subtotal -= wrappedProduct.product.price;
        this.props.removeFromShoppingCart(wrappedProduct.uniqueId)

    };

    calculatePricePerCategory = (price, qty) => {
        let total = (price * qty);
        return total.toFixed(2);
    };

    calculateSubtotal = () => {
        let total = 0;
        this.props.productsInShoppingCart.map((wrappedProduct =>
                total += wrappedProduct.product.price
        ));
        this.subtotal = total;
        this.props.setSubtotal(this.subtotal);

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

                            <span className="fa-right-arrow">
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </span>

                            <span className="fa-down-arrow">
                                <FontAwesomeIcon icon={faArrowDown}/>
                            </span>

                            <span style={{
                                cursor:'no-drop'
                            }}>
                            CHECKOUT DETAILS
                            </span>

                            <span className="fa-right-arrow">
                                <FontAwesomeIcon icon={faArrowRight}/>
                            </span>

                            <span className="fa-down-arrow">
                                <FontAwesomeIcon icon={faArrowDown}/>
                            </span>

                            <span style={{
                                cursor:'not-allowed'
                            }}>
                            ORDER COMPLETE
                            </span>
                        </p>

                        <div className="shopping-cart-elements-subtotal-container">
                            <div className="shopping-cart-elements-container">
                                <table className="shopping-cart-table">
                                    <thead>
                                    <tr>
                                        <th colSpan="2">
                                            <FormattedMessage id="app.shopping.cart.product"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.shopping.cart.price"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.shopping.cart.qty"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="app.shopping.cart.total"/>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.productsInShoppingCart.filter((wrappedProduct, index) =>
                                        index === this.props.productsInShoppingCart.findIndex(
                                        elem => elem.product.id === wrappedProduct.product.id &&
                                            elem.frameOption === wrappedProduct.frameOption
                                        ))
                                        .map((wrappedProduct) =>

                                            <tr>
                                                <td>
                                                    <div className="frame-around-butterfly"
                                                         style={{
                                                             border: `${wrappedProduct.product.isInFrame ? '1px solid #D3D3D3' : '0.3cm solid black'}`,
                                                             borderImage: `${wrappedProduct.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/frame${wrappedProduct.frameOption}.png) 50 / 0.3cm stretch`}`,
                                                         }}>
                                                        {
                                                            <img src={serverURL + wrappedProduct.product.url}
                                                                 style={{
                                                                     width: '100%',
                                                                 }}
                                                            />
                                                        }
                                                    </div>
                                                </td>
                                                <td>{wrappedProduct.product.name}</td>
                                                <td>{wrappedProduct.product.price}</td>
                                                <td>
                                                    <FontAwesomeIcon
                                                        className="shopping-cart-fa-icons"
                                                        icon={faMinusCircle}
                                                        onClick={() => this.removeOneProductFromShoppingCart(wrappedProduct)}
                                                    />
                                                    {this.countQtyByIdAndFrameOption(wrappedProduct.product.id, wrappedProduct.frameOption)}
                                                    <FontAwesomeIcon
                                                        className="shopping-cart-fa-icons"
                                                        icon={faPlusCircle}
                                                        onClick={() => this.addOneProductToShoppingCart(wrappedProduct.product, wrappedProduct.frameOption)}
                                                    />
                                                </td>
                                                <td>{this.calculatePricePerCategory(wrappedProduct.product.price, this.countQtyByIdAndFrameOption(wrappedProduct.product.id, wrappedProduct.frameOption))}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>


                            <div className="subtotal-container">
                                <h1>Cart Totals</h1>
                                <p>
                                    <FormattedMessage id="app.shopping.cart.shipping"/>
                                    bla bla
                                </p>
                                <p>
                                    <FormattedMessage id="app.shopping.cart.sub-total"/>
                                </p>
                                <h1>{this.subtotal.toFixed(2)}</h1>
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
        }
    }
};

const serverURL = process.env.REACT_APP_API_URL;
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
