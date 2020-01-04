import React, {Component} from 'react';
import {getProductsByQueryParam} from "../../../service/fetchService/fetchService";
import FeaturedProduct from "../mainPage/FeaturedProduct";

class FoundProducts extends Component {
    state = {
        products: [],
        queryParam: '',
    };

    componentDidMount() {
        this.getTheProduct();
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.state.queryParam !== this.props.match.params.queryParam) {
            this.setState({
                queryParam: this.props.match.params.queryParam,
            });
            this.getTheProduct();
            window.scrollTo(0, 0);
        }

    }

    getTheProduct = () => {
        getProductsByQueryParam(this.props.match.params.queryParam).then(
            response =>
                this.setState({
                    products: response,
                })
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

export default FoundProducts;
