import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {getProductsByQueryParam} from "../../service/fetchService/fetchService";
import SearchBarFoundProduct from "./SearchBarFoundProduct";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    state = {
        products: []
    };

    handleChange = (e) => {
        if (e.target.value.length >= 3) {
            getProductsByQueryParam(e.target.value)
                .then(resp => this.setState({
                    products: resp
                }))
        }
        if (e.target.value.length < 3) {
            this.setState({
                products: []
            })
        }
    };

    clearSearchBar=()=>{
        this.inputField.current.value='';
        this.setState({
            products:[],
        });
    };


    render() {
        return (
            <div className="search-bar-cart-container">
                <FontAwesomeIcon icon={faShoppingCart} className="shopping-cart-icon"/>
                <div className="search-bar-icon-container">
                    <input type="text" className="search-bar"
                           onChange={this.handleChange}
                           ref={this.inputField}
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                    {this.state.products.length ?
                        <div className="search-bar-result-container">
                            {
                                this.state.products.map((product, index) =>
                                    <SearchBarFoundProduct
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        availableQuantity={product.availableQuantity}
                                        type={product.type}
                                        url={product.url}
                                        clearSearchBar={this.clearSearchBar}

                                        key={index}
                                    />)
                            }
                        </div>
                        :
                        null


                    }
                </div>
            </div>
        );
    }
}

export default SearchBar;
