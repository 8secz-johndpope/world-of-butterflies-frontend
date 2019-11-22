import React, {Component} from 'react';
import ListedProduct from "./ListedProduct";
import {getProducts} from "../../service/fetchService/fetchService";
import DraggableProduct from "./DraggableProduct";

class ProductMapper extends Component {

    state = {
        products: [],
        productsToSpawnIn: [],
        boxWidth: 840,
        boxHeight: 700,
    };

    componentDidMount() {
        getProducts()
            .then(products => this.setState(
                {products: products}
            ))
    }


    isProductArrayEmpty = () => {
        if (!this.state.productsToSpawnIn.length) {
            return true;
        } else {
            return false;
        }
    };

    addProductToSpawnIn = (product) => {
        this.setState({
            productsToSpawnIn: [...this.state.productsToSpawnIn, product]
        });
    };

    widthOnChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            boxWidth: e.target.value,
        })
    };

    heightOnChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            boxHeight: e.target.value,
        })
    };

//TODO maybe delete 'type' from mapping
    render() {
        return (
            <React.Fragment>
                <p>Width:</p>
                <input type="number"
                       onChange={this.widthOnChangeHandler}
                       value={this.state.boxWidth}
                />

                <p>Height:</p>
                <input type="number"
                       onChange={this.heightOnChangeHandler}
                       value={this.state.boxHeight}
                />


                <div className="custom-butterfly-builder">
                    <div className="enable-scroll">
                        {
                            this.state.products.map((product, index) =>
                                <ListedProduct
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    availableQuantity={product.availableQuantity}
                                    type={product.type}
                                    url={product.url}

                                    addProductToSpawnIn={this.addProductToSpawnIn}

                                    key={index}
                                />
                            )}
                    </div>
                    <div className="butterfly-box"
                         style={{
                             height: `${this.state.boxHeight}px`,
                             width: `${this.state.boxWidth}px`,
                             borderImageSource: 'url("http://localhost:8080/images/frames/frame2.png")'
                         }}>
                        {/*    border-image: url("http://localhost:8080/images/frames/frame2.png");
*/}
                        {/*http://localhost:8080/images/frames/dark-frame-v.jpeg*/}
                        {/*<img src={'http://localhost:8080/images/frames/dark-frame-v.jpeg'}/>*/}
                        {
                            this.isProductArrayEmpty() ?
                                null :
                                this.state.productsToSpawnIn.map((product, index) =>
                                    <DraggableProduct
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        availableQuantity={product.availableQuantity}
                                        type={product.type}
                                        url={product.url}

                                        key={index}
                                    />
                                )}
                        {/*<div style={{height: '510px', width: '510px', padding: '10px'}}>*/}
                        {/*</div>*/}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductMapper;
