import React, {Component} from 'react';
import Product from "./Product";
import {getProducts} from "../../service/fetchService/fetchService";

class ProductMapper extends Component {
    state = {
        products: []
    };

    componentDidMount() {
        getProducts()
            .then(products => this.setState(
                {products: products}
            ))
    }

//TODO maybe delete 'type' from mapping
    render() {
        return (
            <div>
                {
                    this.state.products.map((product, index) =>
                        <Product
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            availableQuantity={product.availableQuantity}
                            type={product.type}
                            url={product.url}

                            key={index}
                        />
                    )
                }
            </div>
        );
    }
}

export default ProductMapper;
