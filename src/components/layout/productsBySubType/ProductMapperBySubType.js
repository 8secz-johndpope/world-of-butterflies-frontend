import React, {Component} from 'react';
import {getProductBySubCategory} from "../../../service/fetchService/fetchService";
import FeaturedProduct from "../mainPage/FeaturedProduct";

class ProductMapperBySubType extends Component {
    state = {
        products: [],
        page: 0,
        limit: 6,
        shouldFetchAgain: true,
    };

    componentDidMount() {
        this.getTheProduct();
        window.scrollTo(0, 0);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 400 &&
            this.state.shouldFetchAgain
        ) {
            this.setState({
                page: this.state.page + 1,
            });
            this.getTheProduct();
        }
    };

    getTheProduct = () => {
        getProductBySubCategory(this.props.match.params.type, this.state.page, this.state.limit).then(
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
    };

    render() {
        return (
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
        );
    }
}

export default ProductMapperBySubType;
