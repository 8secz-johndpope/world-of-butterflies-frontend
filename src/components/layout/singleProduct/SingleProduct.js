import React, {Component} from 'react';
import {getProductById} from "../../../service/fetchService/fetchService";
import AdditionalImage from "./AdditionalImage";
import Drift from 'drift-zoom';
import {connect} from 'react-redux';
import {FormattedMessage} from "react-intl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruckMoving, faChevronUp, faChevronDown, faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class SingleProduct extends Component {

    constructor(props) {
        super(props);
        this.zoomPortal = React.createRef();
        this.mainImage = React.createRef();
    }

    state = {
        id: 0,
        product: {},
        productImages: [],
        mainImageUrl: '',
        frameNumber: 1,
        frameThickness: 1,
        amount: 1,
    };

    getTheProduct = () => {
        getProductById(this.props.match.params.id).then(
            response =>
                this.setState({
                    product: response.product,
                    productImages: response.productImages,
                    mainImageUrl: response.product.url,
                })
        );
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResizeEvent);
        this.calculateImageSize();
        this.getTheProduct();
        new Drift(this.mainImage.current, {
            paneContainer: this.zoomPortal.current
        });
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.match.params.id !== this.state.id) {
            this.setState({
                id: this.props.match.params.id,
            });
            this.getTheProduct();
            window.scrollTo(0, 0);
        }
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
        if (this.countAddedProducts(this.state.product.id) < this.state.product.availableQuantity) {
            for (let i = 0; i < this.state.amount; i++) {
                let wrappedProduct = {
                    uniqueId: Date.now(),
                    product: this.state.product,
                    frameOption: this.state.frameNumber,
                };
                this.props.addToShoppingCart(wrappedProduct)
            }
            this.setState({
                amount: 1
            });
            if (this.state.product.availableQuantity - (this.countAddedProducts(this.state.product.id) + this.state.amount) === 0) {
                this.setState({
                    amount: 0
                });
            }
        }
    };

    countAddedProducts = (id) => {
        const countTypes = this.props.productsInShoppingCart.filter(
            wrappedProduct => wrappedProduct.product.id === id);
        return countTypes.length;
    };

    handleMouseEnter = () => {
        this.zoomPortal.current.classList.add("zoomed-portal-active");
    };

    handleMouseLeave = () => {
        this.zoomPortal.current.classList.remove("zoomed-portal-active")
    };

    decreaseAmount = () => {
        if (this.state.amount > 1) {
            this.setState({
                amount: this.state.amount - 1
            })
        }
    };

    increaseAmount = () => {
        if (this.state.amount < (this.state.product.availableQuantity - this.countAddedProducts(this.state.product.id))) {
            this.setState({
                amount: this.state.amount + 1
            });
        }
        if (this.state.product.availableQuantity - this.countAddedProducts(this.state.product.id) === 0) {
            this.setState({
                amount: 0
            });
        }
    };

    handleAmountChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            if (parseInt(e.target.value) > this.state.product.availableQuantity - this.countAddedProducts(this.state.product.id)) {
                this.setState({
                    amount: this.state.product.availableQuantity - this.countAddedProducts(this.state.product.id),
                });
            } else {
                this.setState({
                    amount: parseInt(e.target.value),
                });
            }
        }

    };

    render() {
        return (
            <React.Fragment>
                <div className="vertical-single-product-container">
                    <p className="navigation-bar-above-product">
                        <Link to='/'
                              style={{
                                  textDecoration: 'none',
                                  color: 'black',
                              }}>
                            <span>
                                <FontAwesomeIcon icon={faHome}/>
                            </span>
                        </Link>

                        <span className="slash-span">
                            /
                        </span>

                        <Link to={'/main-categories/' + this.state.product.mainType}
                              style={{
                                  textDecoration: 'none',
                                  color: 'black',
                              }}>
                            <span>
                                {this.state.product.mainType}
                            </span>
                        </Link>

                        <span className="slash-span">
                            /
                        </span>

                        <Link to={'/sub-categories/' + this.state.product.subType}
                              style={{
                                  textDecoration: 'none',
                                  color: 'black',
                              }}>
                            <span>
                                {this.state.product.subType}
                            </span>
                        </Link>
                    </p>
                    <div className="image-gallery-and-main-details-container dotted-spaced-bottom">
                        <div className="image-gallery">
                            <div className="main-image">
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
                                             height: 'auto',
                                             border: '1px solid #D3D3D3',
                                         }}
                                         onMouseEnter={this.handleMouseEnter}
                                         onMouseLeave={this.handleMouseLeave}
                                         ref={this.mainImage}
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
                            <h1>{this.state.product.name}</h1>
                            <div id="zoomed-img-portal"
                                 ref={this.zoomPortal}
                                 className="detail"
                            >

                                <div className="dirty-little-details dotted-spaced-bottom">
                                <span className="stock-and-time">
                                    <p>
                                        <FormattedMessage id="app.single.page.stock"/>
                                        {this.state.product.availableQuantity}</p>
                                    <p>
                                        <FormattedMessage id="app.single.page.delivery.time"/>
                                        3-5
                                        <FormattedMessage id="app.single.page.delivery.days"/>
                                    </p>
                                </span>
                                    {/*<p className="frame-colors">Frame colors: </p>*/}
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
                                </div>
                                <div className="qty-and-buy-btn-container dotted-spaced-bottom">

                                    <div className="number-input-container">
                                        <FontAwesomeIcon icon={faChevronDown} className="fa-chevron"
                                                         onClick={this.decreaseAmount}
                                        />
                                        <input
                                            className="qty-input"
                                            type="number"
                                            value={this.state.amount}
                                            onChange={this.handleAmountChange}
                                        />
                                        <FontAwesomeIcon icon={faChevronUp} className="fa-chevron"
                                                         onClick={this.increaseAmount}
                                        />
                                    </div>
                                    <button
                                        onClick={this.addToCart}
                                        className="custom-add-to-cart"
                                    >

                                        <FormattedMessage id="app.single.page.buy"/>
                                    </button>
                                    <p className='price'>{this.state.product.price}
                                        €
                                        <span id="dph">
                                    <FormattedMessage id="app.single.page.dph"/>
                                </span>
                                    </p>
                                </div>
                                <p className="truck-and-shipping">
                                    <FontAwesomeIcon icon={faTruckMoving}/>
                                    <span>
                                    Postovne
                                </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="under-main-information">
                    <h3 className="description-single-p">
                        <FormattedMessage id="app.single.page.description"/>
                    </h3>
                    <p>
                        <span>
                            <FormattedMessage id="app.single.page.latin-name"/>
                        </span>
                        {this.state.product.name}
                    </p>
                    <p>
                        <span>
                            <FormattedMessage id="app.single.page.origin"/>
                        </span>
                        Peru
                    </p>
                    <p>
                        <span>
                            <FormattedMessage id="app.single.page.frame-size"/>
                        </span>
                        {this.state.product.width}cm x {this.state.product.height}cm
                    </p>
                    <p>
                        <span>
                            <FormattedMessage id="app.single.page.butterfly-size"/>
                        </span>
                        16cm x 14cm
                    </p>
                    <p>
                        <span>
                            <FormattedMessage id="app.single.page.illustrated"/>
                        </span>
                    </p>
                    <p>
                        <span>
                            <FormattedMessage id="app.single.page.be-aware"/>
                        </span>
                    </p>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        preferredLanguage: state.preferredLanguage,
        productsInShoppingCart: state.productsInShoppingCart,
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
