import React, {Component} from 'react';
import '../../../css/ProductAddedPopUp.css';
import {withRouter} from 'react-router-dom'
import {FormattedMessage} from "react-intl";

class ProductAddedPopUp extends Component {
    constructor(props) {
        super(props)
    }

    redirectToCart = () => {
        // document.body.style.overflow = 'auto';
        this.props.history.push('/cart');
    };

    render() {
        return (
            <div className="pop-up-container" style={{'height':document.body.scrollHeight}}>
                <div className="pop-up-body-container">

                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>
                    <div className="pop-up-product-container">
                        <div className="pop-up-product-image">
                            <div
                                className={this.props.product.isInFrame ? 'wrapped-product-in-frame frame-around-butterfly' : 'wrapped-product-not-in-frame frame-around-butterfly'}
                                style={{
                                    borderImageSource: `${this.props.product.isInFrame ? 'none' : `url(${serverURL}/images/frames/${this.props?.chosenFrame?.colour}.png)`}`,
                                }}>
                                {
                                    <img
                                        src={serverURL + this.props.product.url}
                                        className="image-in-shopping-cart"
                                        style={{
                                            border: `${this.props.product.isInFrame ? '1px solid #D3D3D3' : 'none'}`,
                                        }}

                                    />
                                }

                            </div>
                        </div>
                        <div className="pop-up-product-name">
                            {this.props.product.name}
                        </div>
                        <div className="pop-up-product-price">
                            <span>€</span><span> {this.props.product.price.toFixed(2)}</span>

                        </div>
                        <div className="pop-up-multiplier-sign">
                            x
                        </div>
                        <div className="pop-up-product-amount">
                            {this.props.amount}
                        </div>
                        <div className="pop-up-total">
                            <span className="euro-sign">€</span><span>{(this.props.product.price * this.props.amount).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="pop-up-btn-container">
                        <button className="btn1" onClick={this.props.closePopUp}>
                            <FormattedMessage id="app.footer.continue-shopping"/>
                        </button>
                        <button className="btn2" onClick={this.redirectToCart}>
                            <FormattedMessage id="app.footer.go-to-cart"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const serverURL = process.env.REACT_APP_API_URL;
export default withRouter(ProductAddedPopUp);
