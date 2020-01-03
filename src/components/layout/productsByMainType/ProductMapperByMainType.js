import React, {Component} from 'react';
import {getProductByMainCategory} from "../../../service/fetchService/fetchService";
import FeaturedProduct from "../mainPage/FeaturedProduct";

class ProductMapperByMainType extends Component {
    state = {
        products: [],
    };

    componentDidMount() {
        this.getProducts();
        window.scrollTo(0, 0);
    }

    getProducts = () => {
        getProductByMainCategory(this.props.match.params.type).then(
            response => {
                response.sort(function (a, b) {
                    if (a.subType < b.subType) {
                        return -1;
                    }
                    if (a.subType > b.subType) {
                        return 1;
                    }
                    return 0;
                });
                this.setState({
                    products: response,
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

export default ProductMapperByMainType;
