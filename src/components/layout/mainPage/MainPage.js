import React, {Component} from 'react';
import {getProducts} from "../../../service/fetchService/fetchService";
import ProductOnMainPage from "../../componentsForMapping/ProductWithLessDetails";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SlideShow from "./SlideShow";

class MainPage extends Component {
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
            <React.Fragment>
                <SlideShow/>
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
            </React.Fragment>
        );
    }
}


export default MainPage;
