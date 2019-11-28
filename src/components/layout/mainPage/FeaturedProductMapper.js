import React, {Component} from 'react';
import {getProducts} from "../../../service/fetchService/fetchService";
import ProductOnMainPage from "./FeaturedProduct";

class FeaturedProductMapper extends Component {
    state = {
        products: [],
    };


    componentDidMount() {
        getProducts().then(products =>
            this.setState({
                products
            })
        )
    }

    render() {
        return (
            <div className="main-page-featured-product-container">
                {
                    this.state.products.map((product, index) =>
                        <ProductOnMainPage
                            id={product.id}
                            url={product.url}
                            name={product.name}
                            price={product.price}
                            width={product.width}
                            height={product.height}

                            key={index}
                        />
                    )
                }
            </div>
        );
    }
}

export default FeaturedProductMapper;
