import React, {Component} from 'react';
import {getProductBySubCategory} from "../../../service/fetchService/fetchService";
import FeaturedProduct from "../mainPage/FeaturedProduct";

class ProductMapperBySubType extends Component {
    state = {
        products: [],
    };

    componentDidMount() {
        this.getTheProduct();
        window.scrollTo(0, 0);
    }

    getTheProduct = () => {
        getProductBySubCategory(this.props.match.params.type).then(
            response =>
                this.setState({
                    products: response,
                })
        );
    };

    //users.sort(function(a, b){
    //     if(a.firstname < b.firstname) { return -1; }
    //     if(a.firstname > b.firstname) { return 1; }
    //     return 0;
    // })
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
