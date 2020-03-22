import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

class ShoppingCartIcon extends Component {
    state = {
        showCartContent: false,
    };

    handleMouseEnter = () => {
        this.setState({
            showCartContent: true,
        })
    };

    handleMouseleave = () => {
        this.setState({
            showCartContent: false,
        })
    };

    countQtyByIdAndFrameColour = (id, frameColour) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id &&
                wrappedProduct?.chosenFrame?.colour === frameColour
        );
        return countTypes.length;
    };

    calculatePricePerCategory = (price, qty) => {
        let total = (price * qty);
        return total.toFixed(2);
    };

    render() {
        return (
            <div className="shopping-cart-icon-div"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseleave}>
                <div>
                    <Link style={{
                        textDecoration: 'none',
                        color: 'black'
                    }}
                          to='/cart'>
                    <span className="shopping-cart-icon">
                        <span className="shopping-cart-number">
                        {this.props.productsInShoppingCart.length}
                        </span>
                    </span>
                    </Link>
                </div>
                {
                    this.state.showCartContent ?
                        <div className="cart-content-container">
                            {
                                this.props.productsInShoppingCart.filter((wrappedProduct, index) =>
                                    index === this.props.productsInShoppingCart.findIndex(
                                    elem => elem.product.id === wrappedProduct.product.id &&
                                        elem?.chosenFrame?.colour === wrappedProduct?.chosenFrame?.colour
                                    ))
                                    .map((wrappedProduct) =>
                                        <div className="mapped-cart-content-container">
                                            <div className="cart-content-img-container">
                                                <Link to={"/products/" + wrappedProduct.product.id}>
                                                    <div
                                                        className={wrappedProduct.product.isInFrame ? 'wrapped-product-in-frame frame-around-butterfly' : 'wrapped-product-not-in-frame frame-around-butterfly'}
                                                        style={{
                                                            borderImageSource: `${wrappedProduct.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${wrappedProduct?.chosenFrame?.colour}.png)`}`,
                                                        }}>
                                                        {
                                                            <img src={serverURL + wrappedProduct.product.url}
                                                                 className="cart-content-img"
                                                                 style={{
                                                                     border: `${wrappedProduct.product.isInFrame ? '1px solid #D3D3D3' : 'none'}`,
                                                                 }}

                                                            />
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="cart-content-body">
                                                <div className="cart-content-name">
                                                    <Link to={"/products/" + wrappedProduct.product.id}
                                                          style={{
                                                              textDecoration: 'none',
                                                              color: 'black',
                                                          }}>
                                                        <span>
                                                            {wrappedProduct.product.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="cart-content-price-and-qty-container">
                                                    <div className="cart-content-qty">
                                                        {this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct?.chosenFrame?.colour)}
                                                    </div>
                                                    <div className="cart-content-multiply-sign">
                                                        x
                                                    </div>
                                                    <div className="cart-content-price">
                                                        {this.calculatePricePerCategory(wrappedProduct.product.price, this.countQtyByIdAndFrameColour(wrappedProduct.product.id, wrappedProduct?.chosenFrame?.colour))}€
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                        :
                        null
                }

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        productsInShoppingCart: state.productsInShoppingCart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToShoppingCart: function (product) {
            const action = {type: "addProdToShoppingC", product};
            dispatch(action);
        },
        removeFromShoppingCart: function (product) {
            const action = {type: "removeProdFromShoppingC", product};
            dispatch(action);
        }
    }
};

const serverURL = process.env.REACT_APP_API_URL;
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon);
