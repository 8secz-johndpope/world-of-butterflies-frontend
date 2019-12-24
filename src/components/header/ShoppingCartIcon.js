import React, {Component} from 'react';
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
                    <span className="shopping-cart-icon">{this.props.productsInShoppingCart.length}</span>
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

const serverURL = process.env.REACT_APP_API_URL;
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon);
