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
        products: [],
        twoBtnWidth: 0,
        isActive: false,
    };

    componentWillMount() {
        this.getTwoButtonWidth();
    }

    componentDidMount() {
        window.addEventListener("resize", this.getTwoButtonWidth);
    }

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

    captureFocusIn = () => {
        this.setState({
            isActive: true,
        })
    };

    captureFocusOut = () => {
        setTimeout(() => {
            this.setState({
                isActive: false,
            });
        }, 100)
    };

    clearSearchBar = () => {
        this.inputField.current.value = '';
        this.setState({
            products: [],
        });
    };

    getTwoButtonWidth = () => {
        let windowWidth = window.innerWidth;
        let twoBtnWidth = ((windowWidth * 0.84 - 16) / 4) - 27;
        this.setState({
            twoBtnWidth: twoBtnWidth,
        })
    };

    render() {
        return (

            <div className="search-bar-icon-container">
                <input type="text"
                       className="search-bar"
                       onFocus={this.captureFocusIn}
                       onBlur={this.captureFocusOut}
                       onChange={this.handleChange}
                       ref={this.inputField}
                       style={{
                           width: `${this.state.twoBtnWidth}px`,
                       }}

                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                    style={{
                        width: '27px',
                        height: '27px',
                    }}
                />
                {this.state.products.length &&
                this.state.isActive ?
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
        );
    }
}

export default SearchBar;
