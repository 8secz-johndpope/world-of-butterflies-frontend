import React, {Component} from 'react';
import {getProductById} from "../../../service/fetchService/fetchService";
import AdditionalImage from "./AdditionalImage";
import Drift from 'drift-zoom';
import {connect} from 'react-redux';
import {FormattedMessage} from "react-intl";

class SingleProduct extends Component {
    state = {
        wrappedProducts: [],
        product: {},
        productImages: [],
        mainImageUrl: '',
        frameNumber: 2,
        frameThickness: 1
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResizeEvent);
        this.calculateImageSize();

        getProductById(this.props.match.params.id).then(
            response =>
                this.setState({
                    product: response.product,
                    productImages: response.productImages,
                    mainImageUrl: response.product.url,
                })
        );

        new Drift(this.refs.imgMainImage, {
            paneContainer: this.refs.zoomedImgPortal
        })
    }

    handleResizeEvent = () => {
        this.calculateImageSize();
    };
    calculateImageSize = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth < 450) {
            this.setState({
                frameThickness: 0.5,
            })
        } else if (windowWidth > 450) {
            this.setState({
                frameThickness: 1,
            })
        }
    };

    changeMainImage = (url, isInFrame) => {
        this.setState(
            {
                mainImageUrl: url,
                isInFrame: isInFrame,
            }
        )
    };

    mouseEnterCapture = (number) => {
        this.setState({
            frameNumber: number
        })
    };

    addToCart = () => {
        let wrappedProduct = {
            uniqueId: Date.now(),
            product: this.state.product,
            frameOption: this.state.frameNumber,
        };
        this.props.addToShoppingCart(wrappedProduct)
    };

    render() {
        return (
            <React.Fragment>
                <div className="image-gallery-and-main-details-container">
                    <div className="image-gallery">
                        <div className="main-image">
                            {/*{*/}
                            {/*    this.state.product.isInFrame*/}
                            {/*}*/}
                            <div className="frame-around-butterfly"
                                 style={{
                                     border: `${this.state.product.isInFrame ? 'none' : `${this.state.frameThickness}cm solid black`}`,
                                     borderImage: `${this.state.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/frame${this.state.frameNumber}.png) 50 / ${this.state.frameThickness}cm stretch`}`
                                 }}>
                                <img src={serverURL + this.state.mainImageUrl}
                                     data-zoom={serverURL + this.state.mainImageUrl}
                                     alt=""
                                     style={{
                                         width: '100%',
                                         height: 'auto'
                                     }}
                                     onMouseEnter={this.handleMouseEnter}
                                     onMouseLeave={this.handleMouseLeave}
                                     ref="imgMainImage"
                                />
                            </div>
                        </div>

                        <div className="small-images">
                            <div className="frame-around-butterfly"
                                 style={{
                                     border: `${this.state.product.isInFrame ? 'none' : '0.1cm solid black'}`,
                                     borderImage: `${this.state.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/frame${this.state.frameNumber}.png) 50 / 0.1cm stretch`}`
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
                                />)}
                        </div>
                    </div>

                    <div className="main-details">
                        <div id="zoomed-img-portal"
                             ref="zoomedImgPortal"
                             className="detail"
                        >
                            <h1>{this.state.product.name}</h1>
                            <div className="dirty-little-details">
                                <p>
                                    <FormattedMessage id="app.single.page.stock"/>
                                    {this.state.product.availableQuantity}</p>
                                <p>
                                    <FormattedMessage id="app.single.page.delivery.time"/>
                                    3-5
                                    <FormattedMessage id="app.single.page.delivery.days"/>
                                </p>
                                {this.state.product.isInFrame ?
                                    null
                                    :
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
                                }
                                <p id='price'>{this.state.product.price} € <span id="dph">
                                    <FormattedMessage id="app.single.page.dph"/>
                                </span></p>
                            </div>
                            <div className="qty-and-buy-btn-container">
                                <button
                                    onClick={this.addToCart}
                                    className="action-btn-lg"
                                >
                                    <FormattedMessage id="app.single.page.buy"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToShoppingCart: function (wrappedProduct) {
            const action = {type: "addProdToShoppingC", wrappedProduct};
            dispatch(action);
        },
    }
};

const serverURL = process.env.REACT_APP_API_URL;
export default connect(null, mapDispatchToProps)(SingleProduct);
