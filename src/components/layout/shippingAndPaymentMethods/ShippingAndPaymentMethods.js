import React, {Component} from 'react';
import {
    getAllPaymentMethods,
    getAllShippingMethods,
    setShippingAndPaymentMethodsCart,
    getAllShippingMethodsByCartIdForGuest, setShippingAndPaymentMethodsForGuestCart
} from "../../../service/fetchService/fetchService";
import StatusBar from "../../shared/statusBar/StatusBar";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {withRouter} from "react-router-dom";

class ShippingAndPaymentMethods extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        paymentMethods: [],
        shippingMethods: [],
        chosenPaymentMethod: {},
        chosenShippingMethod: {},

    };

    componentDidMount(): void {
        this.getPaymentAndShippingInfo();
        this.clearShippingAndPaymentCost();
    }

    getIdFromSessionStorage = () => {
        if (window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY) !== null) {
            let sessionStorage = JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_SESSION_STORAGE_KEY));
            return sessionStorage.id !== null ? sessionStorage.id : null;
        }
        return null;

    };

    redirectBackIfShippingOrPaymentMethodFailsToLoad = () => {
        this.props.history.push('/checkout')
    };

    clearShippingAndPaymentCost = () => {
        this.props.setShippingCost(0);
        this.props.setPaymentCost(0);
    };

    getPaymentAndShippingInfo = async () => {
        let paymentMethodsResp = await getAllPaymentMethods();
        if (paymentMethodsResp.status === 200) {
            let paymentMethods = await paymentMethodsResp.json();
            this.setState({
                paymentMethods: paymentMethods
            });
        } else {
            this.redirectBackIfShippingOrPaymentMethodFailsToLoad();
        }


        if (this.props.isLoggedIn) {
            let shippingMethodsResp = await getAllShippingMethods();
            if (shippingMethodsResp.status === 200) {
                let shippingMethods = await shippingMethodsResp.json();
                if (shippingMethods.length === 0) {
                    this.redirectBackIfShippingOrPaymentMethodFailsToLoad();
                    return;
                }
                this.setState({
                    shippingMethods: shippingMethods
                })

            } else {
                this.redirectBackIfShippingOrPaymentMethodFailsToLoad();
            }

        } else {
            let shippingMethodsResp = await getAllShippingMethodsByCartIdForGuest(this.getIdFromSessionStorage());
            if (shippingMethodsResp.status === 200) {
                let shippingMethods = await shippingMethodsResp.json();
                if (shippingMethods.length === 0) {
                    this.redirectBackIfShippingOrPaymentMethodFailsToLoad();
                    return;
                }
                this.setState({
                    shippingMethods: shippingMethods
                })
            } else {
                this.redirectBackIfShippingOrPaymentMethodFailsToLoad();
            }
        }
    };

    onRadioChange = (type, method) => {
        if (type === "payment") {
            this.setState({
                chosenPaymentMethod: method
            });
            this.props.setPaymentCost(method.price);
        } else if (type === "shipping") {
            this.setState({
                chosenShippingMethod: method
            });
            this.props.setShippingCost(method.price);
        }
    };

    saveAndRedirectToOrderComplete = () => {
        if (this.props.isLoggedIn) {
            setShippingAndPaymentMethodsCart(this.state.chosenShippingMethod.id, this.state.chosenPaymentMethod.id)
                .then(resp => {
                    this.props.history.push('/order-complete')
                })
        } else {
            setShippingAndPaymentMethodsForGuestCart(this.getIdFromSessionStorage(), this.state.chosenShippingMethod.id, this.state.chosenPaymentMethod.id)
                .then(resp => {
                    window.sessionStorage.setItem(process.env.REACT_APP_SESSION_STORAGE_KEY, JSON.stringify(resp));
                }).then(() => {
                this.props.history.push('/order-complete');
            });

        }
    };

    render() {
        return (
            <div className="shipping-and-payment-container">
                <span className="shipping-and-payment-status-bar">
                    <StatusBar
                        position={3}>
                    </StatusBar>
                </span>
                <div className="payment-method-container">
                    {this.state.paymentMethods.map((paymentMethod) =>
                        <div className="payment-method">
                            <div className="payment-method-radio">
                                <input type="radio"
                                       name={paymentMethod.nameEN}
                                       checked={this.state.chosenPaymentMethod.nameEN === paymentMethod.nameEN}
                                       onChange={() => this.onRadioChange("payment", paymentMethod)}
                                       className="radio-input"
                                />
                            </div>
                            <div className="payment-method-name">
                                {paymentMethod["name" + this.props.preferredLanguage.toUpperCase()]}
                            </div>
                            <div className="payment-method-image">
                                <img src={serverURL + paymentMethod.imageUrl} alt="payment-method"/>
                            </div>
                            <div className="payment-method-price">
                                {paymentMethod.price} €
                            </div>
                        </div>
                    )}
                </div>
                <div className="vertical-border-line"></div>
                <div className="shipping-method-container">
                    {this.state.shippingMethods.map((shippingMethod) =>
                        <div className="shipping-method">
                            <div className="shipping-method-radio">
                                <input type="radio"
                                       name={shippingMethod.nameEN}
                                       checked={this.state.chosenShippingMethod.nameEN === shippingMethod.nameEN}
                                       onChange={() => this.onRadioChange("shipping", shippingMethod)}
                                       className="radio-input"
                                />
                            </div>
                            <div className="shipping-method-name">
                                {shippingMethod["name" + this.props.preferredLanguage.toUpperCase()]}
                            </div>
                            <div className="shipping-method-image">
                                <img src={serverURL + shippingMethod.imageUrl} alt="payment-method"/>
                            </div>
                            <div className="shipping-method-price">
                                {shippingMethod.price} €
                            </div>
                        </div>
                    )}
                </div>
                <div className="total-price-container">
                    <div
                        className="price">{(this.props.subtotal + this.props.shippingCost + this.props.paymentCost).toFixed(2)}€
                    </div>
                    {/*<div className="shipping-info">*/}
                    {/*    <span>*/}
                    {/*        <FormattedMessage id="app.shopping.cart.shipping"/>*/}
                    {/*    </span>*/}
                    {/*    <span>*/}
                    {/*    </span>*/}
                    {/*</div>*/}
                    <div className="custom-next-btn"
                         onClick={this.saveAndRedirectToOrderComplete}>
                        Continue
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        preferredLanguage: state.preferredLanguage,
        subtotal: state.subtotal,
        shippingCost: state.shippingCost,
        paymentCost: state.paymentCost,
        isLoggedIn: state.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSubtotal: function (subtotal) {
            const action = {type: "setSubtotal", subtotal};
            dispatch(action);
        },
        setShippingCost: function (newShippingCost) {
            const action = {type: "setShippingCost", newShippingCost};
            dispatch(action);
        },
        setPaymentCost: function (newPaymentCost) {
            const action = {type: "setPaymentCost", newPaymentCost};
            dispatch(action);
        },
    }
};

const serverURL = process.env.REACT_APP_API_URL;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShippingAndPaymentMethods));
