import React, {Component} from 'react';
import {
    getProductByMainCategory,
    getProductByMainCategoryAndColour,
    getProductByMainCategoryAndOrigin,
    getProductByMainCategoryAndPrice,
    getProductColours,
    getProductOrigins,
} from "../../../service/fetchService/fetchService";
import FeaturedProduct from "../mainPage/FeaturedProduct";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faArrowDown, faCaretDown} from "@fortawesome/free-solid-svg-icons";

class ProductMapperByMainType extends Component {
    state = {
        products: [],
        colours: [],
        origins: [],
        page: 0,
        limit: 6,
        shouldFetchAgain: true,
        isChecked: false,
        chosenColours: [],
        chosenOrigins: [],
        isRequestSorted: false,
        wayOfSorting: '',
        type:'',
    };

    componentDidMount() {
        this.getProducts();
        this.getProductColoursAndOrigins();
        window.scrollTo(0, 0);
        window.addEventListener("scroll", this.handleScroll);
        this.setState({
            type: this.props.match.params.type,
        })
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

        console.log("updated to: " + this.props.match.params.type);
        if (this.state.type !== this.props.match.params.type) {
            console.log("getting into this if");
            this.setState({
                products: [],
                colours: [],
                origins: [],
                page: 0,
                limit: 6,
                shouldFetchAgain: true,
                isChecked: false,
                chosenColours: [],
                chosenOrigins: [],
                isRequestSorted: false,
                wayOfSorting: '',
                type: this.props.match.params.type,
            });
            this.getProducts();
            this.getProductColoursAndOrigins();
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        console.log("unmounted" )
    }

    getProductColoursAndOrigins = () => {
        getProductColours()
            .then(colours => {
                this.setState({
                    colours: colours,
                })
            });
        getProductOrigins()
            .then(origins => {
                this.setState({
                    origins: origins,
                })
            })
    };

    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 400 &&
            this.state.shouldFetchAgain &&
            this.state.chosenColours.length <= 0 &&
            this.state.chosenOrigins.length <= 0
        ) {
            this.setState({
                page: this.state.page + 1,
            });
            this.getProducts();
        }
    };

    getProducts = () => {
        if (this.state.isRequestSorted) {
            getProductByMainCategoryAndPrice(this.props.match.params.type, this.state.page, this.state.limit, this.state.wayOfSorting)
                .then(
                    products => {
                        if (products.length < this.state.limit) {
                            this.setState({
                                shouldFetchAgain: false,
                            })
                        }
                        this.setState({
                            products: [...this.state.products, ...products],
                        })
                    }
                )
        } else {
            getProductByMainCategory(this.props.match.params.type, this.state.page, this.state.limit)
                .then(
                    products => {
                        if (products.length < this.state.limit) {
                            this.setState({
                                shouldFetchAgain: false,
                            })
                        }
                        this.setState({
                            products: [...this.state.products, ...products],
                        })
                    }
                );
        }
    };

    handleUnCheckingColourBox = () => {
        this.setState({
            products:
                this.state.products.filter(prod =>
                    this.state.chosenColours.find(chosenColour =>
                        prod.colourString.includes(chosenColour)) ||
                    this.state.chosenOrigins.find(chosenOrigin =>
                        prod.origin === chosenOrigin
                    ))
        });

        if (this.state.chosenColours.length === 0 && this.state.chosenOrigins.length === 0) {
            this.setState({
                products: [],
                page: 0,
            }, () => this.getProducts());
        }
    };

    handleColourFetch = (colour) => {
        if (this.state.chosenColours.length === 1 && this.state.chosenOrigins.length === 0) {
            this.setState({
                products: [],
                page: -1,
                shouldFetchAgain: true,
            });
            this.getProductsByColour(colour);
        } else {
            this.getProductsByColour(colour);
        }


    };

    concatProducts = (alreadySavedProducts, incomingProducts) => {
        if (alreadySavedProducts.length === 0) {
            return incomingProducts;
        }
        return alreadySavedProducts.concat(incomingProducts.filter(({id}) => !alreadySavedProducts.find(f => f.id === id)));

    };

    getProductsByColour = (colour) => {
        getProductByMainCategoryAndColour(this.props.match.params.type, colour)
            .then(productsArray => {
                    let concatenatedProductArray = this.concatProducts(this.state.products, productsArray);
                    this.setState({
                        products: concatenatedProductArray,
                    })
                }
            )
    };

    handleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        });
    };

    handleCheckboxColourChange = (colour) => {
        if (this.state[colour] === undefined) {
            this.setState({
                [colour]: true,
                chosenColours: [...this.state.chosenColours, colour],
            }, () => this.handleColourFetch(colour));

        } else if (this.state[colour] === true) {
            this.setState({
                [colour]: false,
                chosenColours: this.state.chosenColours.filter(chosenColour => chosenColour !== colour)
            }, () => this.handleUnCheckingColourBox());

        } else {
            this.setState({
                [colour]: true,
                chosenColours: [...this.state.chosenColours, colour],
            }, () => this.handleColourFetch(colour));
        }
    };

    handleCheckboxOriginChange = (origin) => {
        if (this.state[origin] === undefined) {
            this.setState({
                [origin]: true,
                chosenOrigins: [...this.state.chosenOrigins, origin],
            }, () => this.handleOriginFetch(origin));

        } else if (this.state[origin] === true) {
            this.setState({
                [origin]: false,
                chosenOrigins: this.state.chosenOrigins.filter(chosenOrigin => chosenOrigin !== origin)
            }, () => this.handleUnCheckingOriginBox(origin));

        } else {
            this.setState({
                [origin]: true,
                chosenOrigins: [...this.state.chosenOrigins, origin],
            }, () => this.handleOriginFetch(origin));
        }
    };

    handleUnCheckingOriginBox = () => {
        this.setState({
            products:
                this.state.products.filter(prod =>
                    this.state.chosenOrigins.find(chosenOrigin =>
                        prod.origin === chosenOrigin) ||
                    this.state.chosenColours.find(chosenColour =>
                        prod.colourString.includes(chosenColour)
                    ))
        });


        if (this.state.chosenOrigins.length === 0 && this.state.chosenColours.length === 0) {
            this.setState({
                products: [],
                page: 0,
            }, () => this.getProducts());
        }
    };

    handleOriginFetch = (origin) => {
        if (this.state.chosenOrigins.length === 1 && this.state.chosenColours.length === 0) {
            this.setState({
                products: [],
                page: -1,
                shouldFetchAgain: true,
            });
            this.getProductsByOrigin(origin);

        } else {
            this.getProductsByOrigin(origin);
        }
    };

    getProductsByOrigin = (origin) => {
        getProductByMainCategoryAndOrigin(this.props.match.params.type, origin)
            .then(productsArray => {
                    let concatenatedProductArray = this.concatProducts(this.state.products, productsArray);
                    this.setState({
                        products: concatenatedProductArray,
                    })
                }
            )
    };

    sortProducts = (wayOfSorting) => {
        if (this.state.chosenColours.length > 0 || this.state.chosenOrigins.length > 0) {
            if (wayOfSorting === "desc") {
                this.setState({
                    products: this.state.products.sort((a, b) => b.price - a.price),
                }, () => window.dispatchEvent(new Event('resize')));

            } else if (wayOfSorting === "asc") {
                this.setState({
                    products: this.state.products.sort((a, b) => a.price - b.price),
                }, () => window.dispatchEvent(new Event('resize')));
            }
        } else {
            this.setState({
                isRequestSorted: true,
                wayOfSorting: wayOfSorting,
                shouldFetchAgain: true,
                products: [],
                page: 0,
            },()=>this.getProducts())
        }
    };

    render() {
        return (
            <div className="vertical-main-page-featured-product-container">
                <div className="dropdown-filter-container">
                    <div className="dropdown-filter-element-container">
                        <div className="dropdown-filter-element-title">
                            <p>
                                <input
                                    type="checkbox"
                                    id='check0'
                                    defaultChecked={this.state.isChecked}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="check0">
                                    Colour
                                    <span className="filter-arrow-down">
                                        <FontAwesomeIcon icon={faCaretDown}/>
                                    </span>
                                </label>
                            </p>
                        </div>
                        <div className={this.state.isChecked ?
                            "dropdown-filter-element-body" : "checkbox-filters-hidden"}>
                            {
                                this.state.colours.map((colour) =>
                                    <p>
                                        <input type="checkbox" id={'colour-check' + colour.id}
                                               onChange={() => this.handleCheckboxColourChange(colour.colourName)}/>
                                        <label htmlFor={'colour-check' + colour.id}
                                               style={{textTransform: "capitalize"}}>
                                            {colour.colourName}</label>
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    <div className="dropdown-filter-element-container">
                        <div className="dropdown-filter-element-title">

                            <p>
                                <input
                                    type="checkbox"
                                    id='check0'
                                    defaultChecked={this.state.isChecked}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="check0">
                                    Origin
                                    <span className="filter-arrow-down">
                                        <FontAwesomeIcon icon={faCaretDown}/>
                                    </span>
                                </label>
                            </p>
                        </div>
                        <div className={this.state.isChecked ?
                            "dropdown-filter-element-body" : "checkbox-filters-hidden"}>
                            {
                                this.state.origins.map((origin, index) =>
                                    <p>
                                        <input type="checkbox" id={'origin-check' + index}
                                               onChange={() => this.handleCheckboxOriginChange(origin)}/>
                                        <label htmlFor={'origin-check' + index}
                                               style={{textTransform: "capitalize"}}
                                        >
                                            {origin}</label>
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    <div className="dropdown-filter-element-container">
                        <div className="dropdown-filter-element-title">
                            <FontAwesomeIcon icon={faArrowDown}
                                             className="filter-arrows"
                                             onClick={() => this.sortProducts("desc")}
                            />
                            <p id='price-filter'>Price </p>
                            <FontAwesomeIcon icon={faArrowUp}
                                             className="filter-arrows"
                                             onClick={() => this.sortProducts("asc")}
                            />
                        </div>
                        <div className="dropdown-filter-element-body">
                        </div>
                    </div>
                </div>
                <div className="main-page-featured-product-container">
                    {
                        this.state.products.map((product, index) =>
                            <FeaturedProduct
                                id={product.id}
                                url={product.url}
                                name={product.name}
                                price={product.price}
                                width={product.width}
                                height={product.height}
                                isInFrame={product.isInFrame}

                                key={index}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default ProductMapperByMainType;
