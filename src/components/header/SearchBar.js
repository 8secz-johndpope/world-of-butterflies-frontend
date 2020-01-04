import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {getProductsByQueryParam} from "../../service/fetchService/fetchService";
import SearchBarFoundProduct from "./SearchBarFoundProduct";
import {withRouter} from 'react-router-dom'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    state = {
        products: [],
        twoBtnWidth: 0,
        isActive: false,
        searchFieldValue: '',
    };

    componentWillMount() {
        this.getTwoButtonWidth();
    }

    componentDidMount() {
        window.addEventListener("resize", this.getTwoButtonWidth);
    }

    handleChange = (e) => {
        this.setState({
            searchFieldValue: e.target.value,
        });

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

    handleClickOnSearchIcon = () => {
        if (this.state.searchFieldValue.length) {
            this.props.history.push('/search/' + this.state.searchFieldValue)
        }
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
                       value={this.state.searchFieldValue}

                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="search-icon"
                    style={{
                        width: '27px',
                        height: '27px',
                    }}
                    onClick={this.handleClickOnSearchIcon}
                />
                {this.state.products.length &&
                this.state.isActive ?
                    <div className="search-bar-result-container">
                        {
                            this.state.products.slice(0, 5).map((product, index) =>
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

export default withRouter(SearchBar);
