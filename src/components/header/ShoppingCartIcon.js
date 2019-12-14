import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class ShoppingCartIcon extends Component {
    render() {
        return (
            <div className="shopping-cart-icon-div">
                <Link style={{
                    textDecoration: 'none',
                    color: 'black'
                }}
                      to='/cart'>
                    <FontAwesomeIcon icon={faShoppingCart} className="shopping-cart-icon"/>
                    <p className="shopping-cart-qty-counter">{this.props.productsInShoppingCart.length}</p>
                </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon);
