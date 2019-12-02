import React, {Component} from 'react';
import {getProductById} from "../../../service/fetchService/fetchService";
import AdditionalImage from "./AdditionalImage";

class SingleProduct extends Component {
    state = {
        wrappedProducts: [],
        product: '',
        productImages: [],
        mainImage: '',
        isInFrame: false,
        frameNumber: 2,
    };

    componentDidMount() {
        getProductById(this.props.match.params.id).then(
            response =>
                this.setState({
                    product: response.product,
                    productImages: response.productImages,
                    mainImage: response.product.url,
                    isInFrame: true,
                })
        );
    }

    changeMainImage = (url, isInFrame) => {
        console.log("change main image func called");
        console.log(url);
        this.setState(
            {
                mainImage: url,
                isInFrame: isInFrame,
            }
        )
    };

    mouseEnterCapture = (number) => {
        this.setState({
            frameNumber: number
        })
    };

    render() {
        return (
            <div>
                <div className="image-gallery-and-main-details-container">
                    <div className="image-gallery">
                        <div className="main-image">
                            <div className="frame-around-butterfly"
                                 style={{
                                     border: `${this.state.isInFrame ? '1cm solid black' : 'none'}`,
                                     borderImage: `${this.state.isInFrame ? `url(${serverURL}/images/frames/frame${this.state.frameNumber}.png) 50 / 1cm stretch` : 'none'}`
                                 }}>
                                <img src={serverURL + this.state.mainImage}
                                     alt=""
                                     style={{
                                         width: '100%',
                                         height: 'auto'
                                     }}
                                />
                            </div>
                        </div>
                        <div className="small-images">
                            <div className="frame-around-butterfly"
                                 style={{
                                     border: `0.1cm solid black`,
                                     borderImage: `url(${serverURL}/images/frames/frame${this.state.frameNumber}.png) 50 / 0.1cm stretch`
                                 }}>
                                <img src={serverURL + this.state.product.url}
                                     alt=""
                                     onClick={() => this.changeMainImage(this.state.product.url, true)}
                                     className="all-small-images"
                                     style={{
                                         width: '100%',
                                         height: 'auto'
                                     }}
                                />
                            </div>
                            {this.state.productImages.map((image, index) =>
                                <AdditionalImage
                                    url={image.url}
                                    onClickHandler={this.changeMainImage}
                                    key={index}
                                />
                            )}

                        </div>
                    </div>
                    <div className="main-details">
                        <h1>{this.state.product.name}</h1>
                        <div className="dirty-little-details">
                            <p>In stock: {this.state.product.availableQuantity}</p>
                            <p>Delivery: 3-5 working days!</p>
                            <div className="small-frame-icons">
                            <span onMouseEnter={() => this.mouseEnterCapture(1)}
                                  style={{
                                      backgroundImage: `url(${serverURL}/images/frames/color-options/1.png)`
                                  }}
                            />
                                <span onMouseEnter={() => this.mouseEnterCapture(2)}
                                      style={{
                                          backgroundImage: `url(${serverURL}/images/frames/color-options/2.png)`
                                      }}
                                />
                                <span onMouseEnter={() => this.mouseEnterCapture(3)}
                                      style={{
                                          backgroundImage: `url(${serverURL}/images/frames/color-options/3.png)`
                                      }}
                                />
                            </div>
                            <p id='price'>{this.state.product.price} € <span id="dph">with DPH</span></p>

                        </div>
                        <div className="qty-and-buy-btn-container">
                            <input type="number"/>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const serverURL = "http://localhost:8080";
export default SingleProduct;
